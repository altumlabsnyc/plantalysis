import cors from "cors"
import dotenv from "dotenv"
import express, { Request, Response } from "express"
import Stripe from "stripe"

dotenv.config()

// This is your test secret API key.
const port: string | number = process.env.SERVER_PORT || 8080
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

const stripe = new Stripe(stripeKey, { apiVersion: "2022-11-15" })
const app = express()

app.use(express.json())
app.use(cors())

// app.use(express.static('public'));

const YOUR_DOMAIN = "http://localhost:5173"

app.post("/create-checkout-session", async (req: Request, res: Response) => {
  const { priceId } = req.body // you would replace this with the id of the Stripe price you created in the Stripe Dashboard

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
})

app.listen(port, () => console.log(`Running on port ${port}`))
