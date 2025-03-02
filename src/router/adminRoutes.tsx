import { RouteObject } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Home from "../pages/admin/dashboard/Home";
import AllUsers from "../pages/admin/users";
import UserProfile from "../pages/profile";
import FitnessSubscriptions from "../pages/admin/subscriptions/fitness";
import FoodSubscriptions from "../pages/admin/subscriptions/food";
import CreateWorkout from "../pages/Workout/createWorkout/createWorkout";
import Exercise from "../pages/Exercise";
import CreateExcercise from "../pages/Exercise/createExcercise/createExcercise";
import ExcerciseDetail from "../pages/Exercise/exerciseDetail/excerciseDetail";
import MainWorkoutDetail from "../pages/Workout/wokroutDetail";
import SurveyQuestions from "../pages/surveyQuestions";
import SurveyDetail from "../pages/Survey/surveyDetail/surveyDetail";
import CreateSurvey from "../pages/Survey/createSurvey/createSurvey";
import Meals from "../pages/meals";
import MealDetail from "../pages/meals/MealDetail/mealDetail";
import MealPlans from "../pages/MealPlans";
import MealTypes from "../pages/MealTypes";
import CreateMealPlan from "../pages/MealPlans/createMealPlan/createMealPlan";
import MealPlanDetail from "../pages/MealPlans/mealPlanDetail";
import WeekManagement from "../pages/weekManagement/weekManagement";
import Banners from "../pages/banner";
import Packages from "../pages/packages";
import PackageDetail from "../pages/packages/PackageDetail";
import GroupWorkoutManagement from "../pages/groupWorkoutManagem/GroupWorkoutManagement";
import Privacy from "../pages/admin/privacy";
import FAQs from "../pages/admin/FAQ";
import Sports from "../pages/admin/sports";
import DeliveryTime from "../pages/delivery-times/DeliveryTime";
import CreateUser from "../pages/admin/users/CreateUser";
import TermsAndConditions from "../pages/admin/termsAndCOndtions/TermsAndConditions";
import MealIngrediant from "../pages/MealTypes/MealIngrediant";

export const adminRoutes: RouteObject = {
  path: "",
  element: <RootLayout />,
  children: [
    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          children: [
            {
              path: "privacy",
              element: <Privacy />,
            },
            {
              path: "terms-and-conditions",
              element: <TermsAndConditions />,
            },
            {
              path: "faqs",
              element: <FAQs />,
            },
            {
              path: "sports",
              element: <Sports />,
            },
            {
              path: "delivery-times",
              element: <DeliveryTime />,
            },
            {
              path: "home",

              element: <Home />,
            },
            {
              path: "users",

              children: [
                {
                  path: "",
                  element: <AllUsers />,
                },
                {
                  path: ":userId",
                  element: <UserProfile />,
                },
                {
                  path: "create",
                  element: <CreateUser />,
                },
              ],
            },
            {
              path: "subscriptions",
              children: [
                {
                  path: "fitness",
                  element: <FitnessSubscriptions />,
                },
                {
                  path: "food",
                  element: <FoodSubscriptions />,
                },
              ],
            },
            {
              path: "workout",
              children: [
                {
                  path: "group-workout",
                  element: <GroupWorkoutManagement />,
                },
                {
                  path: "create",
                  element: <CreateWorkout />,
                },
                {
                  path: ":workoutID",
                  element: <MainWorkoutDetail />,
                },
              ],
            },
            {
              path: "exercises",
              children: [
                {
                  path: "",
                  element: <Exercise />,
                },
                {
                  path: "create",
                  element: <CreateExcercise />,
                },
                {
                  path: ":exerciseID",
                  element: <ExcerciseDetail />,
                },
              ],
            },
            {
              path: "surveys",
              children: [
                {
                  path: "create",
                  element: <CreateSurvey />,
                },
                {
                  path: ":surveyID",
                  children: [
                    {
                      path: "",
                      element: <SurveyDetail />,
                    },
                  ],
                },
              ],
            },
            {
              path: "surveyQuestions",
              children: [
                {
                  path: "",
                  element: <SurveyQuestions />,
                },
              ],
            },
            {
              path: "meals",
              children: [
                {
                  path: "",
                  element: <Meals />,
                },
                {
                  path: ":mealId",
                  element: <MealDetail />,
                },
              ],
            },
            {
              path: "meal-ingredients",
              children: [
                {
                  path: "",
                  element: <MealIngrediant />,
                },
                // {
                //   path : "create",
                //   element : <CreateMealIngredient />
                // }
              ],
            },
            {
              path: "meal-plans",
              children: [
                {
                  path: "",
                  element: <MealPlans />,
                },
                {
                  path: "create-meal-plan",
                  element: <CreateMealPlan />,
                },
                {
                  path: ":mealPlanId",
                  element: <MealPlanDetail />,
                },
              ],
            },
            {
              path: "meal-types",
              children: [
                {
                  path: "",
                  element: <MealTypes />,
                },
              ],
            },
            {
              path: "weekManagement",
              element: <WeekManagement />,
            },
            {
              path: "banners",
              element: <Banners />,
            },
            {
              path: "packages",
              children: [
                {
                  path: "",
                  element: <Packages />,
                },
                {
                  path: ":packageId",

                  children: [
                    {
                      path: "",
                      element: <PackageDetail />,
                    },
                    {
                      path: "survey/:surveyId",
                      element: <SurveyDetail />,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
