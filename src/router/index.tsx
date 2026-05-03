import HomePage from "../pages/HomePage.tsx";
import TodosPage from "../pages/TodosPage.tsx";
import ProfilePage from "../pages/ProfilePage.tsx";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <TodosPage />,
      },
      {
        path: "/profilepage",
        element: <ProfilePage />,
      },
    ],
  },
];