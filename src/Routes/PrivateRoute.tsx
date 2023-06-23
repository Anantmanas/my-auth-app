import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';


const PrivateRoute: React.FC = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if(user){
    return <Outlet/>
  }else{
    return <Navigate to="/" />;
  }

};

export default PrivateRoute;

