import { RouteObject } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Home from "../pages/admin/dashboard/Home";
import Loadable from "../components/Loadable";
import { lazy } from "react";
const AllUsers = Loadable(lazy(() => import("../pages/admin/users")));
const UserProfile = Loadable(lazy(() => import("../pages/profile")));
const FitnessSubscriptions = Loadable(
  lazy(() => import("../pages/admin/subscriptions/fitness"))
);
const FoodSubscriptions = Loadable(
  lazy(() => import("../pages/admin/subscriptions/food"))
);
const CreateWorkout = Loadable(
  lazy(() => import("../pages/Workout/createWorkout/createWorkout"))
);
const Exercise = Loadable(lazy(() => import("../pages/Exercise")));
const CreateExcercise = Loadable(
  lazy(() => import("../pages/Exercise/createExcercise/createExcercise"))
);
const ExcerciseDetail = Loadable(
  lazy(() => import("../pages/Exercise/exerciseDetail/excerciseDetail"))
);
const MainWorkoutDetail = Loadable(
  lazy(() => import("../pages/Workout/wokroutDetail"))
);
const SurveyQuestions = Loadable(
  lazy(() => import("../pages/surveyQuestions"))
);
const SurveyDetail = Loadable(
  lazy(() => import("../pages/Survey/surveyDetail/surveyDetail"))
);
const CreateSurvey = Loadable(
  lazy(() => import("../pages/Survey/createSurvey/createSurvey"))
);
const Meals = Loadable(lazy(() => import("../pages/meals")));
const MealDetail = Loadable(
  lazy(() => import("../pages/meals/MealDetail/mealDetail"))
);
const MealPlans = Loadable(lazy(() => import("../pages/MealPlans")));
const MealTypes = Loadable(lazy(() => import("../pages/MealTypes")));
const CreateMealPlan = Loadable(
  lazy(() => import("../pages/MealPlans/createMealPlan/createMealPlan"))
);
const MealPlanDetail = Loadable(
  lazy(() => import("../pages/MealPlans/mealPlanDetail"))
);
const WeekManagement = Loadable(
  lazy(() => import("../pages/weekManagement/weekManagement"))
);
const Banners = Loadable(lazy(() => import("../pages/banner")));
const Packages = Loadable(lazy(() => import("../pages/packages")));
const PackageDetail = Loadable(
  lazy(() => import("../pages/packages/PackageDetail"))
);
const GroupWorkoutManagement = Loadable(
  lazy(() => import("../pages/groupWorkoutManagem/GroupWorkoutManagement"))
);
const Privacy = Loadable(lazy(() => import("../pages/admin/privacy")));
const FAQs = Loadable(lazy(() => import("../pages/admin/FAQ")));
const Sports = Loadable(lazy(() => import("../pages/admin/sports")));
const DeliveryTime = Loadable(
  lazy(() => import("../pages/delivery-times/DeliveryTime"))
);
const CreateUser = Loadable(
  lazy(() => import("../pages/admin/users/CreateUser"))
);
const TermsAndConditions = Loadable(
  lazy(() => import("../pages/admin/termsAndCOndtions/TermsAndConditions"))
);
const MealIngrediant = Loadable(
  lazy(() => import("../pages/MealTypes/MealIngrediant"))
);
const WorkoutLibrary = Loadable(lazy(() => import("../pages/WorkoutLibrary")));
const WorkoutRequests = Loadable(
  lazy(() => import("../pages/coach/WorkoutRequests/WorkoutRequests"))
);
const MealOrders = Loadable(
  lazy(() => import("../pages/mealOrders/MealOrders"))
);
const MealOrderDetail = Loadable(
  lazy(() => import("../pages/mealOrders/detail/MealOrderDetail"))
);
const OrderOfDay = Loadable(
  lazy(() => import("../pages/mealOrders/order-of-day/OrderOfDay"))
);
const AllCoupons = Loadable(lazy(() => import("../pages/coupons")));
const CreateCoupons = Loadable(
  lazy(() => import("../pages/coupons/components/CreateCoupon"))
);

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
              path: "coupons",
              element: <AllCoupons />,
            },
            {
              path: "createCoupon",
              element: <CreateCoupons />,
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
              path: "workoutRequests",
              element: <WorkoutRequests />,
            },
            {
              path: "orders",
              children: [
                {
                  path: "",
                  element: <MealOrders />,
                },
                {
                  path: ":orderId",
                  element: <MealOrderDetail />,
                },
                {
                  path: "orderOf",
                  children: [
                    {
                      path: ":day",
                      element: <OrderOfDay />,
                    },
                  ],
                },
              ],
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
              path: "workout-library",
              element: <WorkoutLibrary />,
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
