import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import WorkoutForm, {
  ExerciseSelected,
  useCreateWorkout,
} from "../components/WorkoutForm";
import DeleteTypography from "../../../components/DeleteTypography";
import DoupleClickToConfirm from "../../../components/DoupleClickToConfirm";
import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../../config";
import { useDeleteWorkout, useUpdateWorkout } from "../../../api/workout";
import { WorkoutDetail } from "../../../tables-def/workout";
import { useTranslation } from "react-i18next";

const SettingsPannel = ({ workout }: { workout: WorkoutDetail }) => {
  const deleteWorkout = useDeleteWorkout();
  const { setExer } = useCreateWorkout();
  const updateWorkout = useUpdateWorkout();
  const { t } = useTranslation();
  useEffect(() => {
    const exercisesSelected = workout.exercises.map((exer) => {
      return {
        exercise_id: exer.id,
        exerciseType: "sets",
        name: exer.name,
        reps: exer.WorkoutExercise.reps,
        sets: exer.WorkoutExercise.sets,
        duration: exer.duration,
      };
    });
    setExer(exercisesSelected as ExerciseSelected[]);
  }, []);
  return (
    <Box>
      <Grid container spacing={gridSpacing}>
        <Grid size={12}>
          <WorkoutForm
            task="update"
            initialValues={{
              title: workout.title,
              title_ar: workout.title_ar,
              description: workout.description,
              description_ar: workout.description_ar,
              difficulty_level: workout.difficulty_level,
              duration: workout.duration,
              motivational_message: workout.motivational_message,
              motivational_message_ar: workout.motivational_message_ar,
              type: workout.type,
              image: workout.image,
              package_id: workout.package_id,
              user_id: workout.user_id,
              exercises: [],
            }}
            onSubmit={(values) => {
              updateWorkout.mutate(values);
            }}
          />
        </Grid>
        <Grid size={12}>
          <Divider />
        </Grid>
        <Grid size={12}>
          <Box id="delete-exercise">
            <DeleteTypography mb={2}>
              {t("deleteSec.button", {
                slug: t("slugs.workout"),
              })}
            </DeleteTypography>

            <Typography mb={2}>{t("deleteSec.warning")}</Typography>

            <DoupleClickToConfirm
              color="error"
              onClick={() => {
                deleteWorkout.mutate();
              }}
            >
              {t("gbtn.delete")}
            </DoupleClickToConfirm>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPannel;
