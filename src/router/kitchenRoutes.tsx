import { RouteObject } from "react-router";
import KitchenLayout from "../layouts/KitchenLayout.tsx/KitchenLayout";
import RootLayout from "../layouts/RootLayout/RootLayout";
import MealOrders from "../pages/mealOrders/MealOrders";
import Loadable from "../components/Loadable";
import { lazy } from "react";
const MealOrderDetail = Loadable(
  lazy(() => import("../pages/mealOrders/detail/MealOrderDetail"))
);
const OrderOfDay = Loadable(
  lazy(() => import("../pages/mealOrders/order-of-day/OrderOfDay"))
);
const MealIngrediant = Loadable(
  lazy(() => import("../pages/MealTypes/MealIngrediant"))
);

const kitchenRoutes: RouteObject = {
  path: "",
  element: <RootLayout />,
  children: [
    {
      path: "kitchen_staff",
      element: <KitchenLayout />,
      children: [
        {
          path: "dashboard",
          children: [
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

            // {
            //   path: "meals",
            //   children: [
            //     {
            //       path: "",
            //       element: <Meals />,
            //     },
            //     {
            //       path: ":mealId",
            //       element: <MealDetail />,
            //     },
            //   ],
            // },
            // {
            //   path: "meal-types",
            //   children: [
            //     {
            //       path: "",
            //       element: <MealTypes />,
            //     },
            //   ],
            // },
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
          ],
        },
      ],
    },
  ],
};

export default kitchenRoutes;
