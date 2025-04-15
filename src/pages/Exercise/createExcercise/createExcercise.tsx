import * as Yup from "yup";
import { Box } from "@mui/material";
import ExerciseForm from "../components/ExerciseForm";
import { useCreateExercise } from "../../../api/exercise";
import { useTranslation } from "react-i18next";

const CreateExcercise = () => {
  const { createExercice, progress } = useCreateExercise();
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
    notes: Yup.array().required().label(t("createExc.notes")),
    video: Yup.mixed().optional().label(t("createExc.exc_vid")),
  });
  return (
    <Box>
      <ExerciseForm
        task="create"
        progress={progress}
        onSubmit={(values) => {
          const exerciseFormData = new FormData();
          exerciseFormData.append("name", values.name);
          exerciseFormData.append("name_ar", values.name_ar);
          exerciseFormData.append("description", values.description);
          exerciseFormData.append("description_ar", values.description_ar);
          // exerciseFormData.append("duration", values.duration.toString());
          exerciseFormData.append(
            "cooling_time",
            values.cooling_time.toString()
          );
          exerciseFormData.append("notes", JSON.stringify(values.notes));
          exerciseFormData.append(
            "target_muscles_image",
            values.target_muscles_image as Blob
          );
          exerciseFormData.append("video", values.video as Blob);
          values.images.map((image) =>
            exerciseFormData.append("images", image)
          );
          createExercice.mutate(exerciseFormData);
        }}
        loadingButtonProps={{
          loading: createExercice.isPending,
        }}
        validationSchema={validationSchema}
        initialValues={initialValues}
      />
    </Box>
  );
};

export default CreateExcercise;

const initialValues = {
  name: "",
  name_ar: "",
  description: "",
  description_ar: "",
  images: [],
  target_muscles_image: null,
  video: null,
  cooling_time: -1,
  notes: [],
};
