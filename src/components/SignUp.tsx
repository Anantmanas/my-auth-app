import React, { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box, Grid, Checkbox, FormControlLabel } from '@mui/material';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [signupError, setSignupError] = useState('');


  const handleSignup = async () => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (user) {
        await user.updateProfile({
          displayName: displayName,
        });
      }
      navigate('/dashboard');
    } catch (error) {
      setSignupError('Failed to create an account.');
    }
  };

  return (
    <>

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
          <Typography component="h1" variant="h5">Sign up</Typography>
          <TextField
            type="text"
            label="Username"
            placeholder="User_name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            type="email"
            placeholder="Email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            type="password"
            placeholder="Password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button onClick={handleSignup} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
          {signupError && <div>{signupError}</div>}

          <Grid item>
            <Link to="/">
              {"Already have an account? Login here !"}
            </Link>
          </Grid>

        </Box>
      </Container>

    </>
  );
};

export default Signup;
