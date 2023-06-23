import React from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import LazyLoadingPage from './HomePage';
import { Button, Grid, Typography } from '@mui/material';



const Dashboard: React.FC = () => {
  const currentUser = auth.currentUser;
  const userName = currentUser?.displayName;
  const navigate = useNavigate();



  const handleSignout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={10} >
          <Typography variant="h4" component="h4" >Welcome, {userName}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleSignout} variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Out</Button>
        </Grid>
      </Grid>
      <LazyLoadingPage />
    </>
  );
};

export default Dashboard;
