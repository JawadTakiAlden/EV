import { Box, Typography } from "@mui/material";
import React from "react";
import ExerciseForm from "../components/ExerciseForm";
import { Exercise } from "../../../tables-def/excercise";
import * as Yup from "yup";
import DeleteTypography from "../../../components/DeleteTypography";
import DoupleClickToConfirm from "../../../components/DoupleClickToConfirm";
import { useDeleteExercise, useUpdateExercise } from "../../../api/exercise";
import { useTranslation } from "react-i18next";

const SettingsPannel = ({ exercise }: { exercise: Exercise }) => {
  const deleteExercise = useDeleteExercise();
  const { updateExercice, progress } = useUpdateExercise();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().max(255).label(t("createExc.name")),
    description: Yup.string()
      .nullable()
      .max(1000)
      .label(t("createExc.description")),
    images: Yup.array().required().label(t("createExc.images")),
    target_muscles_image: Yup.mixed()
      .optional()
      .label(t("createExc.target_muscles_image")),
    notes: Yup.mixed().required().label(t("createExc.notes")),
    video: Yup.mixed().optional().label(t("createExc.exc_vid")),
  });

  return (
    <Box>
      <Box id={"update-exercise"}>
        <ExerciseForm
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const exerciseFormData = new FormData();
            exerciseFormData.append("name", values.name);
            exerciseFormData.append("name_ar", values.name_ar);
            exerciseFormData.append("description", values.description);
            exerciseFormData.append("description_ar", values.description_ar);
            exerciseFormData.append(
              "cooling_time",
              values.cooling_time.toString()
            );
            // exerciseFormData.append("duration", values.duration.toString());
            exerciseFormData.append("notes", JSON.stringify(values.notes));
            exerciseFormData.append(
              "target_muscles_image",
              values.target_muscles_image as Blob
            );
            exerciseFormData.append("video", values.video as Blob);
            values.images.map((image) =>
              exerciseFormData.append("images", image)
            );
            updateExercice.mutate(exerciseFormData);
          }}
          task="update"
          loadingButtonProps={{
            loading: updateExercice.isPending,
          }}
          progress={progress}
          initialValues={{
            name: exercise.name,
            name_ar: exercise.name_ar,
            description: exercise.description!,
            description_ar: exercise.description_ar!,
            cooling_time: exercise.cooling_time,
            // duration: exercise.duration!,
            images: exercise.image_urls as string[],
            target_muscles_image: exercise.target_muscles_image as string,
            video: exercise.video_url as string,
            notes: exercise.notes,
          }}
        />
      </Box>
      <Box id="delete-exercise">
        <DeleteTypography mb={2}>
          {t("deleteSec.button", {
            slug: t("slugs.exc"),
          })}
        </DeleteTypography>
        <Typography mb={2}>{t("deleteSec.warning")}</Typography>
        <DoupleClickToConfirm
          color="error"
          loading={deleteExercise.isPending}
          onClick={() => {
            deleteExercise.mutate();
          }}
        >
          {t("gbtn.delete")}
        </DoupleClickToConfirm>
      </Box>
    </Box>
  );
};

export default SettingsPannel;
