import { MealPlan } from "./meal-plans";
import { Meal } from "./meals";
import { WorkoutLog } from "./workout-logs";

export interface UserProfileModel {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  isPersonalized: boolean;
  is_blocked: boolean;
  gender: string | null;
  sport: {
    title: string;
  };
  goal: string | null;
  training_location: string | null;
  sport_duration: string | null;
  age: number | null;
  height: number | null;
  dietary_preferences: string | null;
  is_set_up: boolean;
  is_active: boolean;
  deactivated_at: string | null;
  createdAt: string;
  updatedAt: string;
  fitness_subscriptions: FitnessSubscription[];
  survey_answers: SurveyAnswer[];
  meal_selections: MealSelection[];
  diet_subscriptions: DietSubscription[];
  workout_attendances: WorkoutAttendance[];
  workouts_completed: WorkoutCompleted[];
  exercises_completed: ExerciseCompleted[];
  ["weight-record"]: WeightRecord[];
}

export interface FitnessSubscription {
  days_left: number;
  id: number;
  user_id: number;
  package_id: number;
  pricing_id: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  package: {
    id: number;
    name: string;
  };
  pricing: {
    title: string;
  };
}

export interface SurveyAnswer {
  id: number;
  answer: string;
  createdAt: string;
  updatedAt: string;
  question: {
    id: number;
    title: string;
    image: string;
    type: string;
    survey_id: number;
    createdAt: string;
    updatedAt: string;
  };
  choice: {
    id: number;
    text: string;
    question_id: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface MealSelection {
  id: number;
  user_id: number;
  meal_id: number;
  day: string;
  date: string;
  meal_subscription_id: number;
  createdAt: string;
  updatedAt: string;
  meal: Meal;
}

export interface DietSubscription {
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
  meal_plan: MealPlan;
  address: Address;
  delivery_time: DeliveryTime;
}

export interface DeliveryTime {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: number;
  street: string;
  city: string;
  address_label: string | null;
  building: string;
  postal_code: string;
  state: string;
  delivery_notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutAttendance {
  id: number;
  user_id: number;
  workout_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutCompleted {
  id: number;
  user_id: number;
  workout_id: number;
  createdAt: string;
  updatedAt: string;
  workout: WorkoutDetails;
}

export interface WorkoutDetails {
  id: number;
  title: string;
  type: string;
  difficulty_level: string;
  description: string;
  duration: number;
  coach: number;
  user_id: number;
  day: string;
  package_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseCompleted {
  id: number;
  user_id: number;
  exercise_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface WeightRecord {
  id: number;
  user_id: number;
  weight: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface WieghtProgress {
  date: string;
  value: number;
}

export const getProgressHistoryChartData = ({
  weightProgress,
}: {
  weightProgress: WieghtProgress[];
}) => {
  let data;

  data = {
    catgeories: weightProgress.map((obj, i) => {
      return obj.date;
    }),
    series: weightProgress.map((obj, i) => {
      return obj.value;
    }),
  };

  return data;
};
