import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (resetSuccess) {
      navigate("/");
    }
  }, [resetSuccess,navigate]);

  const handlePasswordReset = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      setResetEmailSent(true);
      setResetError("");
    } catch (error) {
      setResetError("Failed to send password reset email.");
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match.");
      return;
    }

    try {
      const user = auth.currentUser;
      console.log("User:", user);
      await user?.updatePassword(newPassword);
      setResetSuccess(true);
      setResetError("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log("Update Password Error:", error);
      setResetError("Failed to update password.");
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
            <Typography variant="h3">React Auth</Typography>
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
                marginTop: "10px",
              }}
            >
              <ArrowBackIcon />
            </Link>
            <h2>Set New Password</h2>
            <TextField
              type="password"
              placeholder="New Password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Button
              onClick={handlePasswordUpdate}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Password
            </Button>
            {resetError && <div>{resetError}</div>}
          </div>
        )}
      </Box>
    </Container>
  );
};

export default PasswordReset;
