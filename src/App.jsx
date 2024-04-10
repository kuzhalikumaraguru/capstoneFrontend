import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes.jsx";

export default function App() {
  const router = createBrowserRouter(AppRoutes);
  return (
      <RouterProvider router={router} />
  );
}
