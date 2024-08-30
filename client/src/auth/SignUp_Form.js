import React from 'react';
import { TextField, Button, Grid, Checkbox, FormControlLabel, IconButton, InputAdornment, Typography, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { useForm, SubmitHandler } from "react-hook-form"

const SignUpForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const password = watch("Password", "");



  return (
    <form onSubmit={handleSubmit((data)=> {
      console.log(data)
    })}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Username'
            variant='outlined'
            {...register('Username', { required: 'Username is required' })}
            error={!!errors.Username}
            helperText={errors.Username?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Email'
            variant='outlined'
            {...register('Email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            error={!!errors.Email}
            helperText={errors.Email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Password'
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            {...register('Password', { required: 'Password is required' })}
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
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            {...register('ConfirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || "The passwords do not match"
            })}
            error={!!errors.ConfirmPassword}
            helperText={errors.ConfirmPassword?.message}
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
          <FormControlLabel
            control={
              <Checkbox 
                color="primary" 
                {...register('AgreeTerms', { required: 'You must agree to the terms' })}
              />
            }
            label={
              <Typography variant="body2">
                I agree to all the Terms and Privacy Policies
              </Typography>
            }
          />
          {errors.AgreeTerms && (
            <Typography variant="caption" color="error">
              {errors.AgreeTerms.message}
            </Typography>
          )}
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
            Create account
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
            Already have an account? <a href="/login" style={{ color: 'inherit', fontWeight: 'bold' }}>Login</a>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center" color="textSecondary">
            Or Sign up with:
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

export default SignUpForm;