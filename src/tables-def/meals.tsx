import { CustomIngredient } from "../pages/meals/components/MealForm";
import { MealIngreadiant } from "./meal-ingrediant";
import { MealType } from "./meal-types";

export interface Meal {
  id?: number;
  name: string;
  description?: string;
  calories: number;
  images: string[];
  types: MealType[];
  protein: number;
  carb?: number;
  fats: number;
  fiber: number;
  ingredients: CustomIngredient[];
}
