import { createClient } from "@supabase/supabase-js"
import cors from "cors"
import dotenv from "dotenv"
import express, { Request, Response } from "express"
import Stripe from "stripe"
import { v4 as uuidv4 } from "uuid"

dotenv.config()

const port = process.env.PORT || 8080
const stripeKey: string | undefined = process.env.STRIPE_SECRET_KEY
const frontendDomain: string | undefined = process.env.FRONTEND_DOMAIN
const successURL: string | undefined = process.env.SUCCESS_URL
const cancelURL: string | undefined = process.env.CANCEL_URL

if (!stripeKey) {
  throw new Error("The Stripe secret key is missing in .env file")
}

if (!frontendDomain) {
  throw new Error("The frontend domain is missing in .env file")
}

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl!, supabaseKey!)

if (!supabaseUrl) {
  throw new Error("The Supabase URL is missing in .env file")
}

if (!supabaseKey) {
  throw new Error("The Supabase key is missing in .env file")
}

async function insertLabOrder(session: any) {
  const metadata = session.metadata

  const labOrder = JSON.parse(metadata.labOrder)
  const { location, date, lab_notes } = labOrder
  const userId = metadata.userId

  const batchId = uuidv4()
  const brandId = uuidv4()

  // first, create brand
  const brandName = metadata.brandName
  const { data: brandData, error: brandError } = await supabase
    .from("brand")
    .insert([
      {
        name: brandName,
        id: brandId,
        producer_user_id: userId,
      },
    ])

  console.log(brandData)
  console.log(brandError)

  if (brandError) {
    console.error(brandError)
  }

  // then, create batch
  const { data: batchData, error: batchError } = await supabase
    .from("batch")
    .insert([
      {
        id: batchId,
        brand_id: brandId,
      },
    ])

  console.log(batchData)
  console.log(batchError)

  if (batchError) {
    console.error(batchError)
  }

  // Extract data from the session

  console.log("lab order information in function", location, date, lab_notes)

  // Create the order in the database
  const { data, error } = await supabase.from("lab_order").insert([
    {
      location,
      pickup_date: date,
      lab_notes,
      batch_id: batchId,
    }, // Add the rest of the fields here
  ])

  console.log(data)
  console.log(error)

  // Check for error
  if (error) {
    console.error(error)
  }
}

const stripe = new Stripe(stripeKey, { apiVersion: "2022-11-15" })
const app = express()

app.use(cors())

// app.use(express.static('public'));

const YOUR_DOMAIN = "http://localhost:5173"

app.post(
  "/create-checkout-session",
  express.json(),
  async (req: Request, res: Response) => {
    const { priceId, labOrder, brandName, userId } = req.body // you would replace this with the id of the Stripe price you created in the Stripe Dashboard

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          labOrder: JSON.stringify(labOrder),
          brandName: brandName,
          userId: userId,
        },
        success_url: `${frontendDomain}${successURL}`,
        cancel_url: `${frontendDomain}${cancelURL}`,
      })

      res.json({ sessionId: session.id })
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ error: "an error occurred, unable to create session" })
    }
  }
)

// Handle webhook events
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"]

    console.log(sig)

    if (sig === undefined) {
      console.log("undefined)")
      return res.status(400).send(`Webhook Error: No signature`)
    }

    let event

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      // @ts-ignore
      console.log(err)
      // @ts-ignore
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    console.log(event.type)

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object

      insertLabOrder(session)
    }

    res.json({ received: true })
  }
)

app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Hello, this is a test!" })
})

app.listen(port, () => console.log(`Running on port ${port}`))
