import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import CssBaseline from "@mui/material/CssBaseline"
import FormControlLabel from "@mui/material/FormControlLabel"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { createStyles, ThemeProvider } from "@mui/styles"
import * as React from "react"
// import background from "./assets/login/img/frame.png";
import background from "./assets/login/img/frame.png"
import { handleSignIn } from "./Authentication"

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://altumlabs.co/">
        PLANTALYSIS
      </Link>{" "}
      by Altum Labs.
    </Typography>
  )
}

const defaultTheme = createStyles()
export default function SignInSide() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("si entra")
    const data = new FormData(event.currentTarget)
    const formEmail = data.get("email")?.toString()
    const formPassword = data.get("password")?.toString()
    let actualEmail: string = ""
    if (formEmail) {
      actualEmail = formEmail
    }
    let actualPassword: string = ""
    if (formPassword) {
      actualPassword = formPassword
    }
    if (actualEmail == "") {
      Error("Please insert a valid email")
    }
    if (actualPassword == "") {
      Error("Please insert a valid password")
    }
    handleSignIn(actualEmail, actualPassword)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative", // Add relative position to the Grid item
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            sx={{
              position: "absolute",
              top: "20%",
              left: "20%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Log In
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography component="h1" variant="h5">
              Welcome Back
            </Typography>
            Login to access your library.
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
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#CFAA41",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#CFAA41", // Maintain the same background color on hover
                  },
                }}
              >
                Sign In
              </Button>
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
    </ThemeProvider>
  )
}
