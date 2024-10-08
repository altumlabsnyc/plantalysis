import { labOrderInputs } from '@/constants/formInputs'
import useUserDetails from '@/hooks/useUserDetails'
import { LabOrder } from '@/types/supabaseAlias'
import {
  Box,
  Button,
  CssBaseline,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { loadStripe } from '@stripe/stripe-js'
import { useUser } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Stripe from 'stripe'

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://altumlabs.co/">
        PLANTALYSIS
      </Link>{' '}
      by Altum Labs.
    </Typography>
  )
}

export default function PlaceNewOrder() {
  const user = useUser()
  console.log(user)

  const { data: userDetails, error, isLoading } = useUserDetails(user)
  console.log(userDetails, error, isLoading)

  const location = useLocation()

  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    async function fetchStripe() {
      const stripeInstance = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLIC_KEY,
      )
      // @ts-ignore
      setStripe(stripeInstance)
    }
    fetchStripe()
  }, [])

  useEffect(() => {
    // Parse the URL parameters
    const params = new URLSearchParams(location.search)
    const sessionId = params.get('session_id')

    if (sessionId) {
      // Checkout session completed, get session_id from the URL
      // Insert lab order into database
      // handlePlaceLabOrder(labOrder, brandName, sessionId);
    }
  }, [location]) // Re-run when location changes

  const redirectToCheckout = async (formData: FormData, user_id: string) => {
    if (!stripe) return // if stripe hasn't loaded, do nothing

    // else, parse lab order and create a checkout session
    const location = formData.get('location')?.toString() || null
    const pickup_date = formData.get('pickup_date')?.toString() || null
    const strain_info = formData.get('strain_info')?.toString() || null
    const brand_name = formData.get('brand_name')?.toString() || null

    const labOrder: LabOrder = {
      id: '',
      pickup_date: pickup_date,
      // @ts-ignore
      strain_info: strain_info,
      batch_id: null,
      // bio_id: null,
      // gcfid_id: null,
      // gcms_id: null,
      // hplc_id: null,
      // icpms_id: null,
      lab_notes: null,
      lab_user_id: null,
      // lcms_id: null,
      order_time: '1', //TODO: update when backend changes
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: import.meta.env.VITE_PRICE_ID,
          labOrder: labOrder,
          brandName: brand_name,
          userId: user_id,
        }),
      },
    )

    const session = await response.json()

    console.log(session)

    // @ts-ignore
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    })

    if (result.error) {
      // handle error here
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (!user) return

    redirectToCheckout(formData, user.id)
    // const { labOrder: labOrder, brandName: brandName } =
    //   handleLabOrderSubmit(data)
    // console.log(labOrder, brandName)

    // handlePlaceLabOrder(labOrder, brandName)
  }

  //Filling out user data

  return (
    <div>
      <CssBaseline />

      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Place a new order {userDetails?.userDetails.first_name}
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {labOrderInputs.map((input) => (
            <TextField
              key={input.id}
              margin="normal"
              required
              fullWidth
              id={input.id}
              label={input.name}
              name={input.id}
              autoComplete={`Enter your ${input.name.toLowerCase()}`}
              autoFocus
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              alignItems: 'right',
              mb: 2,
              backgroundColor: '#CFAA41',
              color: 'white',
              '&:hover': {
                backgroundColor: '#CFAA41', // Maintain the same background color on hover
              },
            }}
          >
            Continue
          </Button>

          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </div>
  )
}
