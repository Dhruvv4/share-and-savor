import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Landing from "@/components/Landing";
import Register from "@/components/Register";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import RestaurantsList from "@/components/RestaurantList";
import Restaurant from "@/components/Restaurant";
import Checkout from "./components/Checkout";

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
        path: "/restaurants",
        element: (
          <ProtectedRoute>
            <RestaurantsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/restaurants/:id",
        element: (
          <ProtectedRoute>
            <Restaurant />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout/:orderId",
        element: (
          <ProtectedRoute>
            <Checkout />
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
