import { RouteObject } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import CoachLayout from "../layouts/CoachLayout/CoachLayout";
import Home from "../pages/coach/dashboard/Home";
import Loadable from "../components/Loadable";
import { lazy } from "react";
const WorkoutRequests = Loadable(
  lazy(() => import("../pages/coach/WorkoutRequests/WorkoutRequests"))
);
const UserProfile = Loadable(lazy(() => import("../pages/profile")));
const CreateWorkout = Loadable(
  lazy(() => import("../pages/Workout/createWorkout/createWorkout"))
);
const MainWorkoutDetail = Loadable(
  lazy(() => import("../pages/Workout/wokroutDetail"))
);
const GroupWorkoutManagement = Loadable(
  lazy(() => import("../pages/groupWorkoutManagem/GroupWorkoutManagement"))
);
const MainChat = Loadable(lazy(() => import("../pages/Chat")));
const MainLayout = Loadable(
  lazy(() => import("../pages/Chat/Layout/MainLayout"))
);
const ChatRequests = Loadable(
  lazy(() => import("../pages/coach/ChatRequests"))
);
const WorkoutLibrary = Loadable(lazy(() => import("../pages/WorkoutLibrary")));

export const coachRoutes: RouteObject = {
  path: "",
  element: <RootLayout />,
  children: [
    {
      path: "coach",
      element: <CoachLayout />,
      children: [
        {
          path: "dashboard",
          children: [
            {
              path: "home",
              element: <Home />,
            },
            {
              path: "chat-requests",
              element: <ChatRequests />,
            },
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
            {
              path: "workoutRequests",
              element: <WorkoutRequests />,
            },
            {
              path: "users",
              children: [
                {
                  path: ":userId",
                  element: <UserProfile />,
                },
              ],
            },
            {
              path: "workout-library",
              element: <WorkoutLibrary />,
            },
            {
              path: "workout",
              children: [
                {
                  path: "create",
                  element: <CreateWorkout />,
                },
                {
                  path: ":workoutID",
                  element: <MainWorkoutDetail withAction={false} />,
                },
              ],
            },
            {
              path: "group-workout",
              element: <GroupWorkoutManagement />,
            },
          ],
        },
      ],
    },
  ],
};
