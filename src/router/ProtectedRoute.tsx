import React from 'react';
import {Navigate, Outlet} from "react-router";
import {useAppSelector} from "../hook/hook.ts";
import {selectIsAuth} from "../Modules/authorization/selectors.ts";

export const ProtectedRoute: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  return isAuth  ? <Outlet /> : <Navigate to="/" replace />;
};

export const GuestRoute: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  return !isAuth  ? <Outlet /> : <Navigate to="/home" replace />;
};