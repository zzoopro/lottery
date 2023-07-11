import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Loading from "./components/common/Loading";

import Home from "./pages/Home";
import Splash from "./pages/Splash";
import PopupWrap from "./components/common/PopupWrap";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import WriteCapsule from "./pages/WriteCapsule";

const router = createBrowserRouter([
  { path: "/", element: <Splash /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/:userType/capsule-box/:jarId", element: <Home /> },
  {
    path: "/:userType/write/:jarId/:writeType/:step",
    element: <WriteCapsule />,
  },
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
