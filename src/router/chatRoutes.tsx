import { RouteObject } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import MainChat from "../pages/Chat";
import MainLayout from "../pages/Chat/Layout/MainLayout";

export const chatRoutes: RouteObject = {
  path: "",
  children: [
    {
      path: "chat",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <MainChat />,
        },
      ],
    },
  ],
};
