import React from 'react';
import {Navigate, Outlet} from "react-router";
import { useAppSelector } from '../hook/hook'

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated  } = useAppSelector((state) => state.authorization);
  return isAuthenticated  ? <Outlet /> : <Navigate to="/" replace />;
};

export const GuestRoute: React.FC = () => {
  const { isAuthenticated  } = useAppSelector((state) => state.authorization);
  return !isAuthenticated  ? <Outlet /> : <Navigate to="/home" replace />;
};