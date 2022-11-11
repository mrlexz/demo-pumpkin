import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { GoogleAuthContext } from '../../App';

function PublicRoute() {
  const { profile } = useContext(GoogleAuthContext);
  return !profile ? <Outlet /> : <Navigate to="/list" />;
}

export default PublicRoute;