import { RouteObject } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import CoachLayout from "../layouts/CoachLayout/CoachLayout";
import Home from "../pages/coach/dashboard/Home";
import WorkoutRequests from "../pages/coach/WorkoutRequests/WorkoutRequests";
import UserProfile from "../pages/profile";
import CreateWorkout from "../pages/Workout/createWorkout/createWorkout";
import MainWorkoutDetail from "../pages/Workout/wokroutDetail";
import GroupWorkoutManagement from "../pages/groupWorkoutManagem/GroupWorkoutManagement";
import MealIngrediant from "../pages/MealTypes/MealIngrediant";
import MainChat from "../pages/Chat";
import MainLayout from "../pages/Chat/Layout/MainLayout";
import ChatRequests from "../pages/coach/ChatRequests";
import WorkoutLibrary from "../pages/WorkoutLibrary";

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
