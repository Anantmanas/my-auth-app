import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthRoute from './Routes/PrivateRoute';
import Login from './components/LogIn';
import Signup from './components/SignUp';
import Dashboard from './components/Dashboard';
import PasswordReset from './components/PasswordReset';



const App: React.FC = () => {
  return (
  <div className='App'>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path='/dashboard' element={<Dashboard />} />
        
      </Routes>
    </Router>
    </div>
  );
};

export default App;
