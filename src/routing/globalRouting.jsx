import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { Todos } from "../pages/TodoList";
import { Notes } from "../pages/Notes";
import { Users } from "../pages/Users";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/todos",
        element: <Todos />,
      },

      {
        path: "/notes",
        element: <Notes />,
      },
    ],
  },

  {
    element: <ProtectedRoute requiredRole="ADMIN" />,

    children: [
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },

  {
    path: "/",
    element: <Navigate to="/todos" replace />,
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
