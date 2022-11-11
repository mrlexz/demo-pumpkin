import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { GoogleAuthContext } from '../../App';

function PrivateRoute() {
  const { profile } = useContext(GoogleAuthContext);
  return profile && profile?.email ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute