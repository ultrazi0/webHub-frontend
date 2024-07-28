import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { RouterProvider, createBrowserRouter, redirect, useParams } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Root, { allRobotsLoader as robotsLoader, editRobotAction, addRobotAction } from "./pages/Root";
import ControlPanel from "./pages/ControlPanel";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Root />,
            loader: robotsLoader,
            action: addRobotAction
          },
          {
            path: "/edit/:robotId",
            action: editRobotAction
          },
          {
            path: "control-panel/:robotName",
            element: <ControlPanel />
          },
        ]
      }
    ]
  }
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
