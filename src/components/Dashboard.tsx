import React, { useState,useEffect } from 'react';
import { auth } from '../firebase';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LazyLoadingPage from './HomePage';



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
    <div>
      <h2>Welcome, {userName}</h2>
      <button onClick={handleSignout}>Sign Out</button>
<LazyLoadingPage/>
    </div>
  );
};

export default Dashboard;
