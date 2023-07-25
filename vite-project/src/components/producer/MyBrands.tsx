import {
  Box,
  Button,
  CssBaseline,
  Link,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";

import useUserDetails from "@/hooks/useUserDetails";
import useBrandsDetails from "@/hooks/useBrands";
import insertAndShowBrands from "@/hooks/addBrand";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@supabase/auth-helpers-react";
import { useLocation } from "react-router-dom";
import Stripe from "stripe";
import { newBrandInputs } from "../UserTypes";
import { Brand } from "@/types/supabaseAlias";

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

export default function MyBrands() {
  const user = useUser();

  const {
    data: currentBrands,
    error: brandsError,
    isLoading: brandsLoad,
  } = useBrandsDetails(user);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newBrand = getNewBrand(formData);
    if (!currentBrands) {
      throw new Error("error loading new brands");
    }
    insertAndShowBrands({
      oldBrands: currentBrands,
      newBrand: newBrand,
      user: user,
    });
  };

  function getNewBrand(formData: FormData): Brand {
    const brandName = formData.get("brand_name")?.toString() || null;
    if (brandName == null) {
      throw new Error("Please provide a brand name");
    }
    const logo = formData.get("brand_logo")?.toString() || null;
    const id = "";
    const servingSizeStr = formData.get("serving_size")?.toString();

    let servingSize: number | null = null;
    if (servingSizeStr) {
      servingSize = parseFloat(servingSizeStr);
    }
    const prodUserId = user?.id;
    if (prodUserId == undefined) {
      throw new Error("You need to be a valid Producer user to have a brand");
    }

    const newBrand: Brand = {
      name: brandName,
      image_path: logo,
      id: id,
      serving_size: servingSize,
      producer_user_id: prodUserId,
    };
    return newBrand;
  }

  return (
    <div>
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
          Add a new brand
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {newBrandInputs.map((input) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id={input.id}
              label={input.name}
              name={input.id}
              type={input.type}
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
    </div>
  );
}
