import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import signup_img from "../images/signup-removebg-preview.png";
import SignUpForm from "../components/auth/SignUp_Form";
import logo from '../images/logo.png'

const Signup = () => {
  const theme = useTheme();

  return (
    <Box display="flex" height="100vh">
      <Box
        width="50%"
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={signup_img}
          alt="Sign up illustration"
          style={{
            width: "80%",
            height: "80%",
            objectFit: "cover",
            borderRadius: '20px'
          }}
        />
      </Box>
      <Box
        width={{ xs: "100%", md: "50%" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        p={4}
      >
        <Box width="100%" maxWidth="450px" mx="auto">
        <Box sx={{display:'flex',justifyContent:'flex-end'}}>
          <img src={logo} style={{height:'70px', width:'70px'}}></img>
        </Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontSize: "32px",
              fontWeight: 600,
              mb: 1,
            }}
          >
            Sign up
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            paragraph
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              mb: 3,
            }}
          >
            Let's get you all set up so you can access your personal account.
          </Typography>
          <SignUpForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;