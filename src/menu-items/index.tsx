import { ReactNode } from "react";
import { MdHome, MdPeopleOutline, MdRequestPage } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { MdOutlinePayments } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { GiHotMeal } from "react-icons/gi";
import { IoCalendarNumberOutline, IoCreateOutline } from "react-icons/io5";
import { CgExtensionAdd } from "react-icons/cg";
import { PiFlagBannerFold } from "react-icons/pi";
import { CiChat2 } from "react-icons/ci";
import { FaFirstOrder } from "react-icons/fa";
import { FcPrivacy } from "react-icons/fc";
import { FcFaq } from "react-icons/fc";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FcRules } from "react-icons/fc";
import { MdLibraryBooks } from "react-icons/md";

import { FcSportsMode } from "react-icons/fc";

export const adminMenuItems: MenuItemObject[] = [
  {
    title: "dashboard",
    type: "group",
    children: [
      {
        id: "admin-home",
        path: "/admin/dashboard/home",
        title: "home",
        type: "item",
        icon: <MdHome size={30} />,
        external: false,
      },
    ],
  },
  {
    id: "users",
    type: "group",
    title: "users",
    children: [
      {
        id: "all-users",
        title: "all_users",
        path: "/admin/dashboard/users",
        icon: <MdPeopleOutline size={30} />,
        type: "item",
      },
    ],
  },
  {
    id: "survey-questions",
    title: "fin_man",
    type: "group",
    children: [
      {
        id: "packages",
        title: "packages",
        type: "item",
        path: "/admin/dashboard/packages",
        icon: <MdOutlinePayments size={30} />,
      },
      {
        id: "subscription-management",
        type: "coollabse",
        title: "sub_man",
        children: [
          {
            id: "fitness-subscriptions",
            title: "fit_sub",
            path: "/admin/dashboard/subscriptions/fitness",
            icon: <MdOutlinePayments size={30} />,
            type: "item",
          },
          {
            id: "food-subscriptions",
            title: "food_sub",
            path: "/admin/dashboard/subscriptions/food",
            icon: <MdOutlinePayments size={30} />,
            type: "item",
          },
        ],
      },
    ],
  },

  {
    id: "coupons",
    title: "coupons",
    type: "item",
    icon: <GiMeal size={30} />,
    path: "/admin/dashboard/coupons",
  },

  {
    id: "meals",
    title: "meals_man",
    type: "group",
    children: [
      {
        id: "all-meals",
        title: "meals",
        type: "item",
        path: "/admin/dashboard/meals",
        icon: <GiHotMeal size={30} />,
      },
      {
        id: "all-meal-plans",
        title: "meal_plans",
        type: "item",
        icon: <GiMeal size={30} />,
        path: "/admin/dashboard/meal-plans",
      },
      {
        id: "all-meal-types",
        title: "meal_types",
        type: "item",
        icon: <CgExtensionAdd size={30} />,
        path: "/admin/dashboard/meal-types",
      },
      {
        id: "all-meal-ingredients",
        title: "meal_ingred",
        type: "item",
        icon: <CgExtensionAdd size={30} />,
        path: "/admin/dashboard/meal-ingredients",
      },
      {
        id: "kitchen-order",
        path: "/admin/dashboard/orders",
        title: "orders",
        type: "item",
        icon: <FaFirstOrder size={30} />,
        external: false,
      },
      {
        id: "all-delvery-times",
        title: "delivery_times",
        type: "item",
        icon: <RiCalendarScheduleFill size={30} />,
        path: "/admin/dashboard/delivery-times",
      },
      {
        id: "week-management",
        title: "week_man",
        type: "item",
        icon: <IoCalendarNumberOutline size={30} />,
        path: "/admin/dashboard/weekManagement",
      },
    ],
  },

  {
    id: "workout-management",
    type: "group",
    title: "workout_man",
    children: [
      {
        id: "users-requests",
        title: "user_req",
        type: "group",
        children: [
          {
            id: "all-workout-requests",
            title: "workout_req",
            type: "item",
            path: "/admin/dashboard/workoutRequests",
            icon: <MdRequestPage size={30} />,
          },
        ],
      },
      {
        id: "exercises",
        title: "exercises",
        type: "coollabse",
        children: [
          {
            id: "all-exercise",
            title: "all_ex",
            type: "item",
            path: "/admin/dashboard/exercises",
            icon: <CgGym size={30} />,
          },
          {
            id: "create-excercise",
            title: "create_ex",
            type: "item",
            path: "/admin/dashboard/exercises/create",
            icon: <CgGym size={30} />,
          },
        ],
      },
      {
        id: "workout",
        title: "workouts",
        type: "coollabse",
        children: [
          {
            id: "workout-library",
            title: "workout_library",
            type: "item",
            path: "/admin/dashboard/workout-library",
            icon: <MdLibraryBooks size={30} />,
          },
          {
            id: "create-workout",
            title: "create_workout",
            type: "item",
            path: "/admin/dashboard/workout/group-workout",
            icon: <CgGym size={30} />,
          },
        ],
      },
    ],
  },
  {
    id: "banner",
    title: "banner",
    type: "group",
    children: [
      {
        id: "all-banners",
        title: "banners",
        type: "item",
        icon: <PiFlagBannerFold size={30} />,
        path: "/admin/dashboard/banners",
      },
    ],
  },

  {
    title: "public",
    type: "group",
    children: [
      {
        id: "privacy-ploicy",
        path: "/admin/dashboard/privacy",
        title: "privacy",
        type: "item",
        icon: <FcPrivacy size={30} />,
        external: false,
      },
      {
        id: "terms",
        path: "/admin/dashboard/terms-and-conditions",
        title: "terms",
        type: "item",
        icon: <FcRules size={30} />,
        external: false,
      },
      {
        id: "faq",
        path: "/admin/dashboard/faqs",
        title: "faq",
        type: "item",
        icon: <FcFaq size={30} />,
        external: false,
      },

      {
        id: "sport",
        path: "/admin/dashboard/sports",
        title: "sports",
        type: "item",
        icon: <FcSportsMode size={30} />,

        external: false,
      },
    ],
  },
];

export const coacheMenuItems: MenuItemObject[] = [
  {
    title: "dashboard",
    type: "group",
    children: [
      {
        id: "coach-home",
        path: "/coach/dashboard/home",
        title: "home",
        type: "item",
        icon: <MdHome size={30} />,
        external: false,
      },
    ],
  },
  {
    id: "users-requests",
    title: "user_req",
    type: "group",
    children: [
      {
        id: "all-workout-requests",
        title: "workout_req",
        type: "item",
        path: "/coach/dashboard/workoutRequests",
        icon: <MdRequestPage size={30} />,
      },
    ],
  },
  {
    id: "group-workout",
    title: "group_workout",
    type: "item",
    path: "/coach/dashboard/group-workout",
    icon: <CgGym size={30} />,
  },

  {
    id: "workout-library",
    title: "workout_library",
    type: "item",
    path: "/coach/dashboard/workout-library",
    icon: <MdLibraryBooks size={30} />,
  },
  {
    id: "chat",
    title: "chat_request",
    type: "item",
    path: "/coach/dashboard/chat-requests",
    icon: <CiChat2 size={30} />,
  },
  {
    id: "chat",
    title: "chat",
    type: "item",
    path: "/coach/dashboard/chat",
    icon: <CiChat2 size={30} />,
  },
];

export const kitchenItems: MenuItemObject[] = [
  {
    title: "dashboard",
    type: "group",
    children: [
      {
        id: "kitchen-order",
        path: "/kitchen_staff/dashboard/orders",
        title: "orders",
        type: "item",
        icon: <FaFirstOrder size={30} />,
        external: false,
      },
      {
        id: "all-meal-ingredients",
        title: "meal_ingred",
        type: "item",
        icon: <CgExtensionAdd size={30} />,
        path: "/kitchen_staff/dashboard/meal-ingredients",
      },
    ],
  },
];

export interface MenuItemObject {
  id?: string;

  path?: string;

  title: string;

  type: "item" | "group" | "coollabse";

  children?: MenuItemObject[];

  icon?: ReactNode | string;

  target?: "_self" | "_blank";

  external?: boolean;
}
