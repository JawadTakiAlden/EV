export interface WorkoutLog {
  id: number;
  workout_name: string;
  type: "joined" | "complete";
  date: string;
}

export const workoutLogs: WorkoutLog[] = Array.from({ length: 100 }, (_, i) => {
  const workoutNames = [
    "Arm Workout",
    "Leg Day",
    "Cardio Blast",
    "Core Strength",
    "HIIT Session",
    "Full Body Workout",
    "Yoga Stretch",
    "Pilates Power",
    "Upper Body Strength",
    "Flexibility Training",
  ];

  const types: ("join" | "complete")[] = ["join", "complete"];
  const randomWorkout =
    workoutNames[Math.floor(Math.random() * workoutNames.length)];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const date = new Date(
    2024,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  ).toLocaleDateString("en-GB"); // Format: DD-MM-YYYY

  return {
    id: i + 1,
    workout_name: randomWorkout,
    type: randomType,
    date,
  };
});
