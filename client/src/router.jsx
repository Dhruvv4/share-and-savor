import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Landing from "@/components/Landing";
import Register from "@/components/Register";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import Restuarants from "./components/Restuarants";
import SearchData from "./components/SearchData";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/restuaraunts",
        element: (
          <ProtectedRoute>
            <Restuarants />
          </ProtectedRoute>
        ),
      },
      {
        path: "/search",
        element: (
          <ProtectedRoute>
            <SearchData />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
