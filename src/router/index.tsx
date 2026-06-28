import {createBrowserRouter, Navigate} from "react-router";
import HomePage from "@/pages/HomePage";
import TodosPage from "@/pages/TodosPage";
import ProfilePage from "@/pages/ProfilePage";
import UsersPage from "@/pages/UsersPage";
import UserPage from "@/pages/UserPage";
import AuthorizationPage from "@/pages/AuthorizationPage";
import RegistrationPage from "@/pages/RegistrationPage";
import {GuestRoute, ProtectedRoute} from "@/router/ProtectedRoute";

const routes = [
  {
    Component: GuestRoute,
    children: [
      {
        path: "/login",
        Component: AuthorizationPage,
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
        path: "/",
        Component: HomePage,
        children: [
          {index: true, Component: () => <Navigate to="/todo" replace/>},
          {
            path: "/todo",
            Component: TodosPage,
          },
          {
            path: "/profile",
            Component: ProfilePage,
          },
          {
            path: "/users",
            Component: UsersPage,
          },
          {
            path: "/user/:id",
            Component: UserPage,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);