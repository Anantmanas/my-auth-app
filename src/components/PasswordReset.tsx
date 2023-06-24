import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { Button, TextField, Typography, Container, Box, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (resetSuccess) {
      navigate("/");
    }
  }, [resetSuccess, navigate]);

  const handlePasswordReset = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      setResetEmailSent(true);
      setResetError("");
    } catch (error) {
      setResetError("Failed to send password reset email.");
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
        {!resetEmailSent && (
          <div>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginTop: "10px",
              }}
            >
              <ArrowBackIcon />
            </Link>

            <Typography component="h1" variant="h5">
              Password Reset
            </Typography>
            <TextField
              type="email"
              value={email}
              label="Email"
              placeholder="enter your email address"
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Button
              onClick={handlePasswordReset}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            {resetError && <div>{resetError}</div>}
          </div>
        )}

        {resetEmailSent && (
          <div>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginTop: "-10px",
              }}
            >
              <ArrowBackIcon /> 
              
            </Link>
           
            <Alert severity="success">A password reset link has been sent to your email at <span>{email}</span></Alert>

          </div>
        )}
       
      </Box>
    </Container>
  );
};

export default PasswordReset;
