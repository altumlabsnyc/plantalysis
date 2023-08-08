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
import { ChangeEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import logo from '@/components/assets/img/blackP.jpg'
import backgroundVideo from '@/components/assets/vid/BGV_480p.mp4'
import { supabase } from '@/utils/supabase'
import PasswordStrengthMeter from '@/utils/PasswordStrengthMeter'
import { handleResetPassword } from '@/hooks/handleResetPassword'
import { passwordStrength as checkPasswordStrength } from 'check-password-strength'

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

export default function ResetPassword() {
    const history = useHistory()
    const user = useUser()
    // const userDetails = useUserDetails(user);

    const [loading, setLoading] = useState(false)

    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [passwordStrength, setPasswordStrength] = useState<
        '' | 'Too weak' | 'Weak' | 'Medium' | 'Strong'
    >('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(loading) return

        if (!user) {
            toast.error('Error resetting password. Please contact Altum Labs Support.')
            return
        }

        if (passwordStrength === 'Too weak') {
            toast.error('Please enter a stronger password')
            return
        }

        // if passwords don't match, return appropriate toast.error
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        setLoading(true)

        try {
            handleResetPassword(password)
        } catch (error) {
            setLoading(false)
            return
        }
        toast.success("You've successfully reset your password!")
        setTimeout(() => redirectByRole(history, user.app_metadata.plantalysis_role), 2000)
        
    }


    const handlePasswordChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPassword(e.target.value)

        if (e.target.value === '') {
            setConfirmPassword('')
            setPasswordStrength('')
        } else {
            // @ts-ignore
            setPasswordStrength(checkPasswordStrength(e.target.value).value)
        }
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
                    RESET-PASSWORD
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
                    {
                        user
                            ? <>
                                <Typography component="h1" variant="h5">
                                    Welcome Back
                                </Typography>
                                <p className="text-sm mt-1">

                                    <span>
                                        You&apos;re resetting password for {user.email}.{' '}
                                    </span>
                                </p>
                                <Box
                                    component="form"
                                    id="loginForm"
                                    noValidate
                                    onSubmit={handleSubmit}
                                    method="POST"
                                    sx={{ mt: 1 }}
                                >
                                    {[
                                        { name: 'Password', id: 'password', type: 'password' },
                                        { name: 'Confirm Password', id: 'confirm_password', type: 'password' }
                                    ].map(input => (
                                        <div key={input.id}>
                                            <TextField
                                                key={input.id}
                                                margin="normal"
                                                required
                                                fullWidth
                                                id={input.id}
                                                type={input.type}
                                                label={input.name}
                                                name={input.id}
                                                autoComplete={`Enter your ${input.name.toLowerCase()}`}
                                                autoFocus
                                                inputProps={{
                                                    className: 'focus:outline-none focus:ring-0',
                                                }}
                                                onChange={(e) => {
                                                    if (input.id === 'password') {
                                                        handlePasswordChange(e)
                                                    } else if (input.id === 'confirm_password') {
                                                        setConfirmPassword(e.target.value)
                                                    }
                                                }}
                                            />
                                            {input.id === 'confirm_password' && (
                                                <PasswordStrengthMeter strength={passwordStrength} />
                                            )}
                                            {input.id === 'confirm_password' &&
                                                password !== confirmPassword && (
                                                    <Typography variant="body2" color="error">
                                                        Passwords do not match
                                                    </Typography>
                                                )}
                                        </div>))}
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="flex items-center justify-center mt-3 mb-4 bg-green-400 hover:bg-green-500 transition-all duration-200 w-full p-2 rounded-md text-white font-bold"
                                    >
                                        <div className="relative px-4 flex items-center">
                                            {loading && (
                                                <div className="absolute left-0 mb-1">
                                                    <Spinner size="sm" />
                                                </div>
                                            )}
                                            <span>Reset Password</span>
                                        </div>
                                    </button>
                                    <Copyright sx={{ mt: 5 }} />
                                </Box>
                            </>
                            : <>
                                <Typography component="h1" variant="h5">
                                    {'Link expired, please submit password recovery request again.    '}
                                    <Link href="/forget-password" variant="body2">
                                        Forgot Password?
                                    </Link>
                                </Typography>
                            </>

                    }
                </Box>
            </Grid>
        </Grid>
    )
}
