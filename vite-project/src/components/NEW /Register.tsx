import * as React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CssBaseline,
  Button,
  TextField,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import background from "../assets/login/img/frame.png";

import {
  userTypeFields,
  users,
  generalInputs,
  userSpecificInputs,
  UserType,
  Input,
  userData,
  govUser,
  eduUser,
  labUser,
  prodUser,
} from "../UserTypes";
import { handleSignUp } from "../Authentication";

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
  );
}

const defaultTheme = createTheme();
export default function SignInSide() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (
      currentTab == 0 ||
      (currentTab == 1 && selectedUser != "consumer" && selectedUser)
    ) {
      setCurrentTab(currentTab + 1);
    }
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleSelectingUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser(event.target.value);
  };

  const [selectedUser, setSelectedUser] = React.useState<string>();

  const [currentTab, setCurrentTab] = React.useState(0);

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
            Join Us
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {currentTab == 0 && (
              <Typography component="h1" variant="h4">
                Who are you?
              </Typography>
            )}
            {currentTab == 1 ||
              (currentTab == 2 && (
                <div>
                  <Typography component="h1" variant="h5">
                    Create an account
                  </Typography>
                  <Typography component="h1" variant="body2">
                    Already have an account?{" "}
                    <a href="/login" id="showLoginFormLink">
                      Log in
                    </a>
                  </Typography>
                </div>
              ))}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {currentTab == 0 && (
                <RadioGroup
                  value={selectedUser}
                  onChange={handleSelectingUser}
                  sx={{
                    alignItems: "left",
                  }}
                >
                  {users.map((user) => (
                    <Box
                      display="flex"
                      alignItems="left"
                      sx={{
                        my: 1,
                        mx: 4,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "left",
                        border: "1px solid #000",
                      }}
                    >
                      <FormControlLabel
                        key={user.name}
                        value={user.userType}
                        control={<Radio />}
                        labelPlacement="end"
                        sx={{
                          my: 2,
                          mx: 2,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        label={
                          <Box
                            sx={{
                              mx: 2,
                              my: 2,
                              // border: "1px solid #000",
                              flexDirection: "row",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={`./src/components/assets/svg/${user.code}.svg`}
                              alt={user.code}
                              style={{ height: "8%", width: "8%" }}
                            />
                            <input
                              type="radio"
                              name="signup-gender"
                              value={user.code}
                              id={user.code}
                              style={{ visibility: "hidden" }}
                              onChange={() => setSelectedUser(user.userType)}
                            />

                            <span style={{ marginLeft: 4 }}>
                              {
                                <Typography component="p" variant="h5">
                                  {user.name}
                                </Typography>
                              }
                            </span>
                          </Box>
                        }
                      />
                    </Box>
                  ))}
                </RadioGroup>
              )}

              {currentTab == 1 && (
                <div>
                  <Typography variant="h5">{selectedUser}</Typography>
                  {generalInputs.map((input) => (
                    <TextField
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
                </div>
              )}
              {currentTab == 2 && (
                <div>
                  <Typography variant="h5">{selectedUser}</Typography>
                  {users
                    .filter((user) => selectedUser === user.userType)
                    .map((user) => (
                      <div>
                        {user.inputs?.map((input) => (
                          <TextField
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
                      </div>
                    ))}
                </div>
              )}

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  alignItems: "right",
                  mb: 2,
                  backgroundColor: "#CFAA41",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#CFAA41", // Maintain the same background color on hover
                  },
                }}
              >
                Continue
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
