import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./authRoutes";
import errorsRoutes from "./errorsRoutes";
import { chatRoutes } from "./chatRoutes";
import { adminRoutes } from "./adminRoutes";
import kitchenRoutes from "./kitchenRoutes";
import { coachRoutes } from "./coachRoutes";

export const appRouter = () => {
  return createBrowserRouter([
    authRoutes,
    adminRoutes,
    coachRoutes,
    chatRoutes,
    kitchenRoutes,
    chatRoutes,
    ...errorsRoutes,
  ]);
};
