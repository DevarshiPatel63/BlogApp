import React from "react";
import {
  Box,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Typography
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

const Login_Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const password = watch("Password", "");
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.Email}
            helperText={errors.Email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            {...register("Password", { required: "Password is required" })}
            error={!!errors.Password}
            helperText={errors.Password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <FormControlLabel control={<Checkbox />} label="Remember me" />
            </Grid>
            <Grid item>
              <a href="/forget-password" style={{ color: '#FF8682', fontWeight: 'bold' }}>Forget password</a>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            size="large"
            type="submit"
            sx={{ 
              textTransform: 'uppercase',
              py: 1.5,
              mb: 2
            }}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
            Don't have an account? <a href="/signup" style={{ color: '#FF8682', fontWeight: 'bold' }}>Sign Up</a>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center" color="textSecondary">
            Or login with:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ minWidth: 100 }}>
              Facebook
            </Button>
            <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ minWidth: 100 }}>
              Google
            </Button>
            <Button variant="outlined" startIcon={<AppleIcon />} sx={{ minWidth: 100 }}>
              Apple
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login_Form;
