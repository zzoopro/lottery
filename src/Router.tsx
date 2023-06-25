import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import PopupWrap from "./components/common/PopupWrap";
import Loading from "./components/common/Loading";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/:letterId", element: <Home /> },
]);

const Router = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <PopupWrap />
      <RouterProvider router={router} />
      <Loading />
    </Suspense>
  );
};

export default Router;
