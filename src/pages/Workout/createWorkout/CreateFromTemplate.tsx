import React from "react";
import { FormButtonProps } from "../../../tables-def/loadingButtonProps";
import { FormikConfig, useFormik } from "formik";
import { gridSpacing } from "../../../config";
import { WorkoutTemplateCard } from "../../WorkoutLibrary";
import { Grid } from "@mui/material";
import { useGetWorkoutTemplate } from "../../../api/templates";
import {
  alpha,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LoadingDataError from "../../../components/LoadingDataError";

interface WorkoutFromTemaplteFormValues {
  template_id: number | null;
  date: string | null;
  user_id?: string | null;
  package_id?: string | null;
  difficulty_level: string;
}

const CreateFromTemplate = ({
  ButtonProps,
  ...formikProps
}: FormikConfig<WorkoutFromTemaplteFormValues> & FormButtonProps) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    ...formikProps,
  });
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useGetWorkoutTemplate();
  const theme = useTheme();
  if (isLoading) {
    return <Typography>{t("global.loading")}</Typography>;
  }
  if (isError) {
    return <LoadingDataError refetch={refetch} />;
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={gridSpacing}>
        {data?.data.map((workout) => (
          <Grid
            sx={{
              cursor: "pointer",
              borderRadius: "10px",
              backgroundColor: alpha(theme.palette.primary.main, 0.5),
              padding: values.template_id === workout.id ? "4px" : 0,
              transition: "0.1s",
            }}
            onClick={() => {
              setFieldValue("template_id", workout.id);
            }}
            key={workout.id}
            size={{ xs: 12, sm: 6, md: 4 }}
          >
            <WorkoutTemplateCard withAction={false} row workout={workout} />
          </Grid>
        ))}
        <Box>
          {!!touched.template_id && !!errors.template_id && (
            <FormHelperText error>{errors.template_id}</FormHelperText>
          )}
        </Box>
      </Grid>
      <Grid sx={{ mt: 2 }} container spacing={gridSpacing}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl
            error={!!touched.difficulty_level && !!errors.difficulty_level}
          >
            <InputLabel>{t("workoutForm.diff_level")}</InputLabel>
            <OutlinedInput
              label={t("workoutForm.diff_level")}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.difficulty_level}
              name="difficulty_level"
              type="text"
            />
            {!!touched.difficulty_level && !!errors.difficulty_level && (
              <FormHelperText error>{errors.difficulty_level}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <Button
        {...ButtonProps}
        variant="contained"
        type="submit"
        sx={{ width: { xs: "100%", sm: "initial" }, my: 2 }}
      >
        {t("gbtn.create")}
      </Button>
    </form>
  );
};

export default CreateFromTemplate;
