import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import toast, { Toaster } from 'react-hot-toast'
// import background from "./assets/login/img/frame.png";

import { handleSignIn } from '@/hooks/handleSignIn'
import delay from '@/utils/delay'
import isValidEmail from '@/utils/isValidEmail'
import redirectByRole from '@/utils/redirectByRole'
import { useUser } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import background from './assets/login/img/frame.png'
import Spinner from './common/Spinner'

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

export default function SignInSide() {
  const history = useHistory()
  const user = useUser()
  // const userDetails = useUserDetails(user);

  const [loading, setLoading] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()
    const password = data.get('password')?.toString()

    if (!email || !isValidEmail(email)) {
      toast.error('Please insert a valid email')
      setLoading(false)
      return
    }

    if (!password) {
      toast.error('Please insert a valid password')
      setLoading(false)
      return
    }

    handleSignIn(email, password).then(async (userType) => {
      if (!userType) {
        toast.error('Invalid email password combination')
        setLoading(false)
        return
      }
      // needed so that the user updates and the protected route does not deny them
      await delay(1000)

      setLoading(false)
      redirectByRole(history, userType)
    })
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Toaster />
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative', // Add relative position to the Grid item
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          sx={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Log In
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 16,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <Typography component="h1" variant="h5">
            Welcome Back
          </Typography>
          <p className="text-sm mt-1">
            {user ? (
              <span>
                Logged in as {user.email}.{' '}
                <span
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() =>
                    redirectByRole(history, user.app_metadata.plantalysis_role)
                  }
                >
                  Jump to dashboard
                </span>
              </span>
            ) : (
              <span>Login to access your dashboard.</span>
            )}
          </p>
          <Box
            component="form"
            id="loginForm"
            noValidate
            onSubmit={handleSubmit}
            method="POST"
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputProps={{
                className: 'focus:outline-none focus:ring-0',
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{
                className: 'focus:outline-none focus:ring-0',
              }}
            />
            <button
              type="submit"
              className="flex items-center justify-center mt-3 mb-4 bg-yellow-400 hover:bg-yellow-500 transition-all duration-200 w-full p-2 rounded-md text-white font-bold"
            >
              <div className="relative px-4 flex items-center">
                {loading && (
                  <div className="absolute left-0 mb-1">
                    <Spinner size="sm" />
                  </div>
                )}
                <span>Sign In</span>
              </div>
            </button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
