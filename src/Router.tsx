import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/:letterId", element: <Home /> },
]);

const Router = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Router;
