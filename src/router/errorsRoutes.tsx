import { RouteObject } from "react-router";
import NotFound404 from "../pages/errors/_404";
import RootLayout from "../layouts/RootLayout/RootLayout";

export const NotFound: RouteObject = {
  path: "",
  element: <RootLayout />,
  children: [
    {
      path: "*",
      element: <NotFound404 />,
    },
  ],
};

const errors = [NotFound];

export default errors;
