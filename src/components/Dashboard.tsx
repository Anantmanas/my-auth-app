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
      <Grid container spacing={2} padding={2}  sx={{
        boxShadow: 3,
        marginBottom: 5,   
      }}>
        <Grid item xs={8} >
          <Typography variant="h5" component="h5" >Welcome, {userName}</Typography>

        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleSignout} variant="contained" >Sign Out</Button>
        </Grid>
      </Grid>
      <LazyLoadingPage />
    </>
  );
};

export default Dashboard;
