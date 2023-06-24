import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Button, TextField, Typography, Container, Box, Grid, Checkbox, FormControlLabel, Alert } from '@mui/material';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>('');
  const [rememberMe, setRememberMe] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setSuccessAlert(true);
      if (rememberMe) {
        localStorage.setItem('email', email);
      } else {
        localStorage.removeItem('email');
      }
     
      setTimeout(() => {
        navigate('/user/dashboard');
      }, 1000);

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (

    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <Typography variant="h3">React Auth</Typography>
        <Typography component="h1" variant="h5">Log in</Typography>

        {error && (
          <Alert severity="error">{error}</Alert>
        )
        
        }
        <form onSubmit={handleLogin}>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth

          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth

          />

          <FormControlLabel
            control={<Checkbox value="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>
          {successAlert && (
            <Alert severity="success">Logged In Successfully</Alert>
          )}
          <Grid container>
            <Grid item xs>
              <Link to="/passwordreset">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
