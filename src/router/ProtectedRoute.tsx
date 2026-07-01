import React from 'react';
import {Navigate, Outlet} from "react-router";
import {useAppSelector} from "@/hook/hook";
import {selectIsAuth} from "@/Modules/authorization/authorizationSelectors.ts";
import {selectProfileRequest} from "@/Modules/profile/profileSelectors.ts";

export const ProtectedRoute: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  return isAuth  ? <Outlet /> : <Navigate to="/login" replace />;
};

export const GuestRoute: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  return !isAuth  ? <Outlet /> : <Navigate to="/" replace />;
};

export const RoleProtectedRoute: React.FC<{ allowedRoles: string[]}> = ({ allowedRoles }) => {
  const {data: userData} = useAppSelector(selectProfileRequest);
  const hasAccess = userData?.roles.some((role) => allowedRoles.includes(role)) ?? false;
  return hasAccess ? <Outlet /> : <Navigate to="/" replace />;
};