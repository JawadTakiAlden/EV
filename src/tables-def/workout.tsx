export interface WorkoutModel {
  id: number;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  type: "group" | "personalized";
  difficulty_level: string;
  duration: number;
  is_template?: boolean;
  template_id?: number;
  is_Active?: boolean;
  motivational_message: string;
  motivational_message_ar: string;
  coach: string;
  image: string;
  user?: {
    id: number;
    name: string;
  };
  createdAt: string;
  exercises?: Exercise[];
}

export interface WorkoutDetail extends WorkoutModel {
  exercises: Exercise[];
  workout_completion: WorkoutCompletion[];
  package_id: string;
  user_id: string;
  coach: string;
}

interface Exercise {
  id: number;
  name: string;
  description: string;
  duration: number | null;
  image_urls: string[];
  target_muscles_image: string;
  video_url: string;
  createdAt: string;
  updatedAt: string;
  WorkoutExercise: WorkoutExerciseDetails;
}

interface WorkoutExerciseDetails {
  sets: number;
  reps: number;
}

export interface WorkoutExercise {
  sets: number;
  reps: number;
  exercise: Exercise;
}

export interface WorkoutCompletion {
  id?: number;
  user: {
    id: number;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
