import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage.tsx";
import TodosPage from "../pages/TodosPage.tsx";
import ProfilePage from "../pages/ProfilePage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import RegistrationPage from "../pages/RegistrationPage.tsx";

export const routes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
    children: [
      {
        path: "todo",
        element: <TodosPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);