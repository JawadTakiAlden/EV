import { RouteObject } from "react-router";
import MinimalLayout from "../layouts/MinimalLayout/MinimalLayout";
import Login from "../pages/authentication/Login/Login";

export const authRoutes: RouteObject = {
  path: "auth",
  element: <MinimalLayout />,
  children: [
    {
      children: [
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ],
};
