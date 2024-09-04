import { Box, Typography } from "@mui/material";
import React from "react";
import login_img from "../images/login.png";
import Login_Form from "../components/auth/Login_Form";
import logo from "../images/logo.png";

const Login = () => {
  return (
    <Box display="flex" height="100vh">
      <Box
        width={{ xs: "100%", md: "50%" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        p={4}
      >
        <Box width="100%" maxWidth="450px" mx="auto">
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <img src={logo} style={{ height: "70px", width: "70px" }}></img>
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
            Login
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
            Login to access your travelwise account{" "}
          </Typography>
          <Login_Form />
        </Box>
      </Box>
      <Box
        width="50%"
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            width: "80%",
            height: "80%",
            objectFit: "cover",
            borderRadius: "20px",
          }}
          src={login_img}
        ></img>
      </Box>
    </Box>
  );
};

export default Login;
