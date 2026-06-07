import {createBrowserRouter, Navigate} from "react-router";
import HomePage from "@/pages/HomePage";
import TodosPage from "@/pages/TodosPage";
import ProfilePage from "@/pages/ProfilePage";
import AuthorizationPage from "@/pages/AuthorizationPage";
import RegistrationPage from "@/pages/RegistrationPage";
import {GuestRoute, ProtectedRoute} from "@/router/ProtectedRoute";

const routes = [
  {
    Component: GuestRoute,
    children: [
      {
        path: "/",
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