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

import { labOrderInputs, LabOrder } from "../UserTypes";
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
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const labOrderData = handleLabOrderSubmit(data);
    console.log(labOrderData);

    // }
  };

  //Filling out user data

  function handleLabOrderSubmit(data: FormData): LabOrder {
    const location = data.get("location")?.toString() || null;
    const pickup_date = data.get("pickup_date")?.toString() || null;
    const strain_info = data.get("strain_info")?.toString() || null;

    const labOrder: LabOrder = {
      analysis_id: null,
      id: "",
      location: location,
      pickup_date: pickup_date,
      strain_info: strain_info,
    };
    return labOrder;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Place a new order
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {labOrderInputs.map((input) => (
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
    </ThemeProvider>
  );
}
