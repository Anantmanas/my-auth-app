import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Button, TextField, Typography, Container, Box, Grid, Checkbox, FormControlLabel } from '@mui/material';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<any>('');

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            navigate('/dashboard');
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

                {error && <div>{error}</div>}
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
                        control={<Checkbox value="remember" color="primary" />}
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
                    {/* <Button type="submit" variant="contained" color="primary" fullWidth>
                        Log In
                    </Button> */}
                </form>
                {/* <Link to="/passwordreset">
                    <Button>Reset Password</Button>
                </Link>
                <Typography>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </Typography> */}
            </Box>
        </Container>
    );
};

export default Login;
