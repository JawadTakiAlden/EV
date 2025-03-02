export interface AdminStats {
  metrics: {
    activeFitnessSubscriptions: number;
    activeMealSubscriptions: number;
    newSignupsCount: number;
    workoutCompletionRate: number;
  };
}
