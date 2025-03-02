import { MealType } from "./meal-types";

export interface MealPlan {
  id?: number;
  title: string;
  title_ar: string;
  calories: number;
  image: string;
  subscriptions_count: number;
  price_monthly: number;
  types: MealType[];
}
