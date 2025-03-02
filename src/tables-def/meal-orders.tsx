import { Meal } from "./meals";
import { Address, DeliveryTime, UserProfileModel } from "./user-profile";

export interface MealOrder {
  id: number;
  user_id: number;
  meal_subscription_id: number;
  order_date: string;
  status: "listed" | "pending" | "done";
  createdAt: string;
  updatedAt: string;
  user: UserProfileModel;
  meals: Meal[];
  subscription: {
    id: number;
    type: string;
    meal_plan_id: number;
    user_id: number;
    is_active: boolean;
    start_date: string;
    end_date: string;
    delivery_time_id: number;
    address_id: number;
    createdAt: string;
    updatedAt: string;
    meal_plan: {
      id: number;
      title: string;
      calories: number;
      image: string;
      price_monthly: number;
    };
    address: Address;
    delivery_time: DeliveryTime;
  };
}

//         "address": {
//             "id": 1,
//             "street": "street",
//             "city": "city",
//             "address_label": "My home",
//             "building": "41",
//             "postal_code": "12112",
//             "state": "state",
//             "delivery_notes": "aa",
//             "createdAt": "2025-01-07T06:54:44.000Z",
//             "updatedAt": "2025-01-07T06:54:44.000Z"
//         },
//         "delivery_time": {
//             "id": 1,
//             "title": "From 12 PM to 6 PM (Morning)",
//             "createdAt": "2025-01-07T06:54:39.000Z",
//             "updatedAt": "2025-01-07T06:54:39.000Z"
//         }
//     }
// }
