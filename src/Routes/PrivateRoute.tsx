import React, { useEffect, useState } from 'react';
import { Route, useNavigate, Navigate, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from '@firebase/auth';

export interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<IAuthRouteProps> = (props) => {
  const { children, ...rest } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/" />;

  return <Routes><Route {...rest}>{children}</Route></Routes>;
};

export default AuthRoute;
