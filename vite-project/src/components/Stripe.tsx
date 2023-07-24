import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import Stripe from "stripe"

const ProductDisplay = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    async function fetchStripe() {
      const stripeInstance = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLIC_KEY
      )
      // @ts-ignore
      setStripe(stripeInstance)
    }
    fetchStripe()
  }, [])

  const redirectToCheckout = async () => {
    if (!stripe) return // if stripe hasn't loaded, do nothing

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: import.meta.env.VITE_PRICE_ID,
        }),
      }
    )

    const session = await response.json()

    console.log(session)

    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    })

    if (result.error) {
      // handle error here
    }
  }

  return (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachment</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <button onClick={() => redirectToCheckout()} disabled={!stripe}>
        Checkout
      </button>
    </section>
  )
}

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
)

export default function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.")
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      )
    }
  }, [])

  return message ? <Message message={message} /> : <ProductDisplay />
}
