import { createBrowserRouter } from "react-router-dom"

import LoginPage from "@/pages/login"
import DashboardPage from "@/pages/dashboard"
import InventoryPage from "@/components/inventory/InventoryPage"
import { AppLayout } from "@/components/layout/app-layout"
import { ProtectedRoute } from "./protected-route"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
  children: [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "dashboard",
          element: <DashboardPage />,
          
        },
        { path: "inventory",
          element: <InventoryPage /> },
      ],
    },
    ],
  },
])
