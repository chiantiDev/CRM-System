import {createBrowserRouter, Navigate} from "react-router";
import HomePage from "../pages/HomePage.tsx";
import TodosPage from "../pages/TodosPage.tsx";
import ProfilePage from "../pages/ProfilePage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import RegistrationPage from "../pages/RegistrationPage.tsx";
import { ProtectedRoute, GuestRoute } from "./ProtectedRoute.tsx";

const routes = [
  {
    Component: GuestRoute,
    children: [
      {
        path: "/",
        Component: LoginPage,
      },
      {
        path: "/registration",
        Component: RegistrationPage,
      },
    ],
  },
  {
    Component: ProtectedRoute,
    children: [
      {
        path: "/home",
        Component: HomePage,
        children: [
          {index: true, Component: () => <Navigate to="todo" replace/>},
          {
            path: "todo",
            Component: TodosPage,
          },
          {
            path: "profile",
            Component: ProfilePage,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);