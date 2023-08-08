import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import toast, { Toaster } from 'react-hot-toast'
// import background from "./assets/login/img/frame.png";

import Spinner from '@/components/common/Spinner'
import { handleSignIn } from '@/hooks/handleSignIn'
import delay from '@/utils/delay'
import isValidEmail from '@/utils/isValidEmail'
import redirectByRole from '@/utils/redirectByRole'
import { useUser } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import logo from '@/components/assets/img/blackP.jpg'
import backgroundVideo from '@/components/assets/vid/BGV_480p.mp4'
import { supabase } from '@/utils/supabase'

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

export default function ForgetPassword() {
    const history = useHistory()
    const user = useUser()
    //   console.log(user)
    // const userDetails = useUserDetails(user);

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')?.toString()

        if (!email || !isValidEmail(email)) {
            toast.error('Please insert a valid email')
            setLoading(false)
            return
        }
        // check if email exist
        // send update password email
        const location = window.location
        // const redirectURL = location.protocol + "//" + location.host + "/reset-password"
        const redirectURL = "http://localhost:5173/reset-password"
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: redirectURL
        })
        toast.success('Password recovery email sent. Please check your inbox!')
        // console.log(error)
        setLoading(false)
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
                    position: 'relative',
                }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                >
                    <source src={backgroundVideo} type="video/mp4" />
                </video>

                <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                        position: 'absolute',
                        top: '35%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 16px rgba(0, 0, 0, 1)',
                    }}
                >
                    PLANTALYSIS
                </Typography>

                <a href="https://www.plantalysis.com">
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '150px',
                            height: '150px',
                            borderRadius: '75%',
                            marginTop: '20px',
                        }}
                    />
                </a>

                <a href="https://www.plantalysis.com">
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '150px',
                            height: '150px',
                            borderRadius: '75%',
                            marginTop: '20px',
                        }}
                    />
                </a>
                <a href="https://www.plantalysis.com">
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '150px',
                            height: '150px',
                            borderRadius: '75%',
                            marginTop: '20px',
                        }}
                    />
                </a>
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{
                        position: 'absolute',
                        top: '70%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 16px rgba(0, 0, 0, 1)',
                    }}
                >
                    FORGET-PASSWORD
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
                        Password Recovery
                    </Typography>
                    <p className="text-sm mt-1">
                        <span>Fill email address to receive password recovery email</span>
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
                        <button
                            type="submit"
                            className="flex items-center justify-center mt-3 mb-4 bg-green-400 hover:bg-green-500 transition-all duration-200 w-full p-2 rounded-md text-white font-bold"
                        >
                            <div className="relative px-4 flex items-center">
                                {loading && (
                                    <div className="absolute left-0 mb-1">
                                        <Spinner size="sm" />
                                    </div>
                                )}
                                <span>Send Email</span>
                            </div>
                        </button>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
