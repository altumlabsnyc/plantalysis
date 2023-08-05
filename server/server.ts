import { createClient } from "@supabase/supabase-js"
import cors from "cors"
import dotenv from "dotenv"
import express, { Request, Response } from "express"
import nodemailer from "nodemailer"
import Stripe from "stripe"
import { v4 as uuidv4 } from "uuid"
import { Database } from "./types/supabase"
import { Batch, InsertDemo } from "./types/supabaseAlias"

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
const supabase = createClient<Database>(supabaseUrl!, supabaseKey!)

if (!supabaseUrl) {
  throw new Error("The Supabase URL is missing in .env file")
}

if (!supabaseKey) {
  throw new Error("The Supabase key is missing in .env file")
}

interface Metadata {
  priceId: string
  facilityId: string
  userId: string
  turnaroundTime: Database["public"]["Enums"]["turnaround_time_enum"]
  pickupDate: string // ISO string
  testIds: string[]
}

async function insertLabOrder(session: any) {
  const metadata: Metadata = session.metadata

  // @ts-ignore
  metadata.testIds = JSON.parse(metadata.testIds)

  const batchId = uuidv4()

  const batch: Batch = {
    id: batchId,
    producer_facility_id: metadata.facilityId,
    producer_user_id: metadata.userId,
    serving_size: null,
    weight: null,
    unit_weight: null,
  }

  // create batch for lab order
  const { data: batchData, error: batchError } = await supabase
    .from("batch")
    .insert([batch])

  console.log(batchData)
  console.log(batchError)

  if (batchError) {
    console.error(batchError)
  }

  // Create the order in the database
  const labOrderId = uuidv4()
  const { data, error } = await supabase.from("lab_order").insert([
    {
      id: labOrderId,
      batch_id: batchId,
      pickup_date: metadata.pickupDate,
      turnaround_time: metadata.turnaroundTime,
    }, // Add the rest of the fields here
  ])

  console.log(data)
  console.log(error)

  // for each test, insert into lab_order_on_test table
  const { data: labOrderOnTestData, error: labOrderOnTestError } =
    await supabase.from("lab_order_on_test").insert(
      metadata.testIds.map((test_id) => ({
        lab_order_id: labOrderId,
        test_id: test_id,
      }))
    )

  console.log(labOrderOnTestData)
  console.log(labOrderOnTestError)

  // Check for error
  if (error) {
    console.error(error)
  }
}

const stripe = new Stripe(stripeKey, { apiVersion: "2022-11-15" })
const app = express()

app.use(cors({ origin: process.env.FRONTEND_DOMAIN }))

// app.use(express.static('public'));

app.post(
  "/create-checkout-session",
  express.json(),
  async (req: Request, res: Response) => {
    let {
      priceId,
      userId,
      facilityId,
      turnaroundTime,
      pickupDate,
      testIds,
    }: Metadata = req.body

    console.log(testIds)

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
          priceId,
          userId,
          facilityId,
          turnaroundTime,
          pickupDate,
          testIds: JSON.stringify(testIds),
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

type DemoBody = InsertDemo & {
  text?: string;
};

app.post('/send-email',
  express.json(),
  async (req: Request, res: Response) => {
    const emailUser: string = `${process.env.EMAIL_USERNAME}`
    const emailPass: string = `${process.env.EMAIL_PASS}`
    const demoBody: DemoBody = req.body;

    if (!demoBody.first_name || !demoBody.last_name || !demoBody.company || !demoBody.job_title || !demoBody.email || !demoBody.phone || !demoBody.state || !demoBody.text) {
      return res.status(400).send("Bad request. Some fields are missing in request body.")
    }

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: emailUser,
          pass: emailPass
        }
      });

      // Must delete text from body before inserting into database
      const emailText = demoBody.text;
      delete demoBody.text;

      await Promise.all([transporter.sendMail({
        from: `Team @ Altum 👻 ${emailUser}`, // sender address
        to: `${process.env.DEMO_RECEIVER}`, // list of receivers
        subject: 'Demo Scheduled', // Subject line
        text: emailText, // plain text body
      }),
      supabase.from("demos_scheduled").insert([demoBody]).select()
      ]);

      return res.status(200).send("Email sent successfully")
    } catch (err) {
      console.error(err)
      // @ts-ignore
      return res.status(500).send(`Internal Error: ${err.message}`)
    }
  });

app.get("/test", express.json(), (req: Request, res: Response) => {
  res.json({ message: "Hello, this is a test!" })
})

app.listen(port, () => console.log(`Running on port ${port}`))
