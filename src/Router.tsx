import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Loading from "./components/common/Loading";

import Home from "./pages/Home";
import Splash from "./pages/Splash";
import PopupWrap from "./components/common/PopupWrap";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Reply from "./pages/Replay";

const router = createBrowserRouter([
  { path: "/", element: <Splash /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/:userId/random-box/", element: <Home /> },
  { path: "/:userId/random-box/:capsuleId/reply", element: <Reply /> },
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
