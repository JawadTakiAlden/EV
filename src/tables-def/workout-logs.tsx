export interface WorkoutLog {
  id: number;
  workout_name: string;
  type: "joined" | "complete";
  date: string;
}
