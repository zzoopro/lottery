import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Loading from "./components/common/Loading";

import Home from "./pages/Home";
import Splash from "./pages/Splash";
import PopupWrap from "./components/common/PopupWrap";

const router = createBrowserRouter([
  { path: "/", element: <Splash /> },
  { path: "/:userType/random-box/", element: <Home /> },
  { path: "/:userType/random-box/:letterId", element: <Home /> },
]);

const Router = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Loading />
      <RouterProvider router={router} />
      <PopupWrap />
    </Suspense>
  );
};

export default Router;
