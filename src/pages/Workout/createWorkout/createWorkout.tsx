import { Box, Button, Typography } from "@mui/material";
import WorkoutForm from "../components/WorkoutForm";
import { useSearchParams } from "react-router-dom";
import { useCreateWorkout } from "../../../api/workout";
import { useTranslation } from "react-i18next";
import {
  useCreateWorkoutFromTemplate,
  useCreateWorkoutTemplate,
  useGetWorkoutTemplate,
} from "../../../api/templates";
import { useState } from "react";

import CreateFromTemplate from "./CreateFromTemplate";

const CreateWorkout = () => {
  const [searchParams] = useSearchParams();
  const [workoutOrigin, setWorkoutOrigin] = useState<"new" | "library">(
    "library"
  );

  const type = searchParams.get("type") as
    | "group"
    | "personalized"
    | "template";
  const user_id = searchParams.get("user_id") as string | null;
  const user_name = searchParams.get("user_name") as string;
  const day = searchParams.get("day");
  const package_id = searchParams.get("package_id") as string;
  const packageName = searchParams.get("package_name") as string;

  const createWorkout = useCreateWorkout();
  const createWorkoutTemplate = useCreateWorkoutTemplate();
  const createFromTemplate = useCreateWorkoutFromTemplate();
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h4" mb={4} sx={{ color: "primary.main" }}>
        {type === "template"
          ? t("createWorkout.templateSlug")
          : t("createWorkout.header", {
              type: type,
              day,
              slug:
                type === "personalized"
                  ? t("createWorkout.personSlug", { username: user_name })
                  : t("createWorkout.groupSlug", { packageName: packageName }),
            })}
        {}
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          setWorkoutOrigin(workoutOrigin === "library" ? "new" : "library");
        }}
      >
        {workoutOrigin === "library"
          ? t("createWorkout.newWorkout")
          : t("createWorkout.library")}
      </Button>
      <Box
        sx={{
          display: workoutOrigin === "library" ? "none" : "block",
        }}
      >
        <WorkoutForm
          onSubmit={(values) => {
            if (type === "template") {
              createWorkoutTemplate.mutate(values);
            } else {
              createWorkout.mutate({ ...values, date: day });
            }
          }}
          loadingButtonProps={{
            loading: createWorkout.isPending,
          }}
          initialValues={{
            title: "",
            title_ar: "",
            image: null,
            description: "",
            description_ar: "",
            motivational_message: "",
            motivational_message_ar: "",
            type: type,
            duration: 0,
            difficulty_level: "easy",
            package_id: package_id,
            user_id: user_id,
            exercises: [],
          }}
        />
      </Box>
      <Box
        sx={{
          display: workoutOrigin === "library" ? "block" : "none",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <CreateFromTemplate
            initialValues={{
              user_id: user_id,
              package_id: package_id,
              date: day,
              difficulty_level: "easy",
              calories_burned: 0,
              template_id: null,
            }}
            loadingButtonProps={{
              loading: createFromTemplate.isPending,
            }}
            onSubmit={(values) => {
              createFromTemplate.mutate(values);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateWorkout;
