import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthRoute from './Routes/PrivateRoute';
import Login from './components/LogIn';
import Signup from './components/SignUp';
import Dashboard from './components/Dashboard';
import PasswordReset from './components/PasswordReset';
import PrivateRoute from './Routes/PrivateRoute';




const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/passwordreset" element={<PasswordReset />} />
          {/* <Route
          path="/dashboard"
          element={<PrivateRoute path="/dashboard" element={<Dashboard />} />}
        /> */}
        <Route path='/user'element={<PrivateRoute />}>
          <Route path='dashboard'element={<Dashboard />}/>
        </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
