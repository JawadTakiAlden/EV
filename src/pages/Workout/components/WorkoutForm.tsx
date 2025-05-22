import {
  alpha,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { FormikConfig, useFormik } from "formik";
import React, { memo, useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import { gridSpacing } from "../../../config";
import { Exercise } from "../../../tables-def/excercise";
import {
  areEqual,
  FixedSizeList as List,
  ListChildComponentProps,
} from "react-window";
import ExcerciseCard from "../../Exercise/components/ExcerciseCard";
import DeleteTypography from "../../../components/DeleteTypography";
import MainCard from "../../../components/MainCard";
import { numberOfLines } from "../../../utils/maxLinesNumber";
import { create } from "zustand";
import { useGetExercises } from "../../../api/exercise";
import LoadingDataError from "../../../components/LoadingDataError";
import FileImagePicker from "../../../components/FileImagePicker";
import { useTranslation } from "react-i18next";
import { FormButtonProps } from "../../../tables-def/loadingButtonProps";

interface CreateWorkoutStore {
  exercises: ExerciseSelected[];

  addExercise: (exercise: ExerciseSelected) => void;

  removeExercise: (exerciseId: number) => void;

  reset: () => void;

  setExer: (exercises: ExerciseSelected[]) => void;
}

export const useCreateWorkout = create<CreateWorkoutStore>((set, get) => ({
  exercises: [],
  addExercise: (exerciseSelected) => {
    const currentExercises = get().exercises;
    const newExercises = [...currentExercises, exerciseSelected];
    set({ exercises: newExercises });
  },
  removeExercise: (exerciseId) => {
    const currentExercises = get().exercises;
    const removed = currentExercises.filter(
      (ele) => ele.exercise_id !== exerciseId
    );
    set({ exercises: removed });
  },
  reset: () => {
    set({ exercises: [] });
  },

  setExer: (exer) => {
    set({ exercises: exer });
  },
}));

interface WorkoutFormValues {
  title: string; //done
  title_ar: string; //done
  description: string; //done
  description_ar: string; //done
  type: "group" | "personalized" | "template"; //done
  difficulty_level: string; //done
  duration: number; //done
  user_id?: string | null;
  motivational_message: string;
  motivational_message_ar: string;
  package_id?: string | null;
  exercises: ExerciseSelected[] | null;
  image: null | string | File;
}

export interface ExerciseSelected {
  exercise_id: number;
  name?: string;
}

interface WorkoutFormProps {
  task?: "update" | "create";
}

export const ExerciseSelectedCard = ({
  exercise,
}: {
  exercise: ExerciseSelected;
}) => {
  const { removeExercise } = useCreateWorkout();
  const { t } = useTranslation();

  return (
    <MainCard sx={{ p: 1 }}>
      <Typography
        sx={{
          ...numberOfLines(1),
        }}
      >
        {exercise.name}
      </Typography>

      <Button
        color="error"
        variant="outlined"
        onClick={() => {
          removeExercise(exercise.exercise_id);
        }}
      >
        {t("gbtn.remove")}
      </Button>
    </MainCard>
  );
};

const ExerciseRow: React.FC<ListChildComponentProps<Exercise[]>> = memo(
  ({ index, style, data }) => {
    const { addExercise } = useCreateWorkout();

    return (
      <>
        <div
          style={{
            ...style,
            width: "300px",
          }}
          key={index}
          onClick={() => {
            addExercise({
              name: data[index].name!,
              exercise_id: data[index].id!,
            });
          }}
        >
          <ExcerciseCard
            // withBorder={isActive}
            noActions={true}
            exercise={data[index]}
          />
        </div>
      </>
    );
  },
  areEqual
);

const WorkoutForm = ({
  task = "create",
  ButtonProps,
  ...formikProps
}: FormikConfig<WorkoutFormValues> & WorkoutFormProps & FormButtonProps) => {
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

  const { t, i18n } = useTranslation();

  const { exercises, reset } = useCreateWorkout();
  const [inputSearch, setInputSearch] = useState<string>("");

  const workoutImg = useMemo(() => {
    return (
      values.image && (
        <img
          src={
            typeof values.image === "string"
              ? values.image
              : URL.createObjectURL(values.image as unknown as MediaSource)
          }
          alt="exercise "
          style={{
            width: "150px",
            height: "100%",
            borderRadius: "6px",
            maxHeight: "150px",
            objectFit: "contain",
            maxWidth: "100%",
          }}
        />
      )
    );
  }, [values.image]);

  const exercisesRemoteData = useGetExercises();

  useEffect(() => {
    setFieldValue("exercises", exercises);
  }, [exercises, setFieldValue]);

  useEffect(() => {
    if (exercises.length > 0) {
      reset();
    }
  }, []);

  if (exercisesRemoteData.isLoading) {
    return <Typography>{t("global.loading")} ...</Typography>;
  }

  if (exercisesRemoteData.isError) {
    return <LoadingDataError refetch={exercisesRemoteData.refetch} />;
  }

  let allExercises = exercisesRemoteData?.data?.data?.filter((exer) =>
    exer.name.toLowerCase().includes(inputSearch.toLowerCase())
  )!;

  return (
    <Box>
      <DeleteTypography
        sx={{
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
          mb: 3,
        }}
      >
        {t("gbtn." + task)} {t("workoutForm.workout")}
      </DeleteTypography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, sm: 8, md: 6 }}>
            <Grid container spacing={gridSpacing}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl error={!!touched.title && !!errors.title}>
                  <InputLabel>{t("workoutForm.title")}</InputLabel>
                  <OutlinedInput
                    label={t("workoutForm.title")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    name="title"
                    type="text"
                  />
                  {!!touched.title && !!errors.title && (
                    <FormHelperText error>{errors.title}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl error={!!touched.title_ar && !!errors.title_ar}>
                  <InputLabel>
                    {t("arf", {
                      slug: t("slugs.title"),
                    })}
                  </InputLabel>
                  <OutlinedInput
                    label={t("arf", {
                      slug: t("slugs.title"),
                    })}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title_ar}
                    name="title_ar"
                    type="text"
                  />
                  {!!touched.title_ar && !!errors.title_ar && (
                    <FormHelperText error>{errors.title_ar}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl
                  error={
                    !!touched.difficulty_level && !!errors.difficulty_level
                  }
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
                    <FormHelperText error>
                      {errors.difficulty_level}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl error={!!touched.duration && !!errors.duration}>
                  <InputLabel>{t("workoutForm.duration")}</InputLabel>
                  <OutlinedInput
                    label={t("workoutForm.duration")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.duration}
                    name="duration"
                    type="number"
                  />
                  {!!touched.duration && !!errors.duration && (
                    <FormHelperText error>{errors.duration}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl
                  disabled
                  error={!!touched.duration && !!errors.duration}
                >
                  <FormLabel>{t("workoutForm.type")}</FormLabel>
                  <RadioGroup
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    row
                  >
                    <FormControlLabel
                      value="group"
                      control={<Radio readOnly />}
                      label={t("global.group")}
                    />
                    <FormControlLabel
                      value="personalized"
                      control={<Radio readOnly />}
                      label={t("global.person")}
                    />
                    <FormControlLabel
                      value="template"
                      control={<Radio readOnly />}
                      label={t("global.template")}
                    />
                  </RadioGroup>
                  {!!touched.type && !!errors.type && (
                    <FormHelperText error>{errors.type}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControl
                  error={
                    !!touched.motivational_message &&
                    !!errors.motivational_message
                  }
                >
                  <InputLabel>{t("workoutForm.message")}</InputLabel>
                  <OutlinedInput
                    label={t("workoutForm.message")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.motivational_message}
                    name="motivational_message"
                    type="text"
                  />
                  {!!touched.motivational_message &&
                    !!errors.motivational_message && (
                      <FormHelperText error>
                        {errors.motivational_message}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControl
                  error={
                    !!touched.motivational_message_ar &&
                    !!errors.motivational_message_ar
                  }
                >
                  <InputLabel>
                    {t("arf", {
                      slug: t("slugs.message"),
                    })}
                  </InputLabel>
                  <OutlinedInput
                    label={t("arf", {
                      slug: t("slugs.message"),
                    })}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.motivational_message_ar}
                    name="motivational_message_ar"
                    type="text"
                  />
                  {!!touched.motivational_message_ar &&
                    !!errors.motivational_message_ar && (
                      <FormHelperText error>
                        {errors.motivational_message_ar}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 6 }}>
            <FormControl error={!!touched.description && !!errors.description}>
              <InputLabel>{t("workoutForm.desc")}</InputLabel>
              <OutlinedInput
                label={t("workoutForm.desc")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                name="description"
                type="text"
                multiline
                rows={5}
              />
              {!!touched.description && !!errors.description && (
                <FormHelperText error>{errors.description}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              error={!!touched.description_ar && !!errors.description_ar}
            >
              <InputLabel>
                {t("arf", {
                  slug: t("slugs.description"),
                })}
              </InputLabel>
              <OutlinedInput
                label={t("workoutForm.desc")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description_ar}
                name="description_ar"
                type="text"
                multiline
                rows={5}
              />
              {!!touched.description_ar && !!errors.description_ar && (
                <FormHelperText error>{errors.description_ar}</FormHelperText>
              )}
            </FormControl>
            <Grid size={{ xs: 12 }}>
              <Grid container spacing={1}>
                <Grid size={"grow"} sx={{ transition: "width 0.3s" }}>
                  <FileImagePicker
                    title={t("imagePicker.title", { slug: "Workout" })}
                    onSelectImage={(files) => {
                      setFieldValue("image", files?.[0]);
                    }}
                    name="image"
                    accept="image/png,image/jpg,image/jpeg"
                    id="image"
                    onBlur={handleBlur}
                    renderContent={() => {
                      return (
                        <Box sx={{ mt: 2 }}>
                          <Typography textAlign={"center"} color="primary.main">
                            {t("imagePicker.types")}
                          </Typography>
                        </Box>
                      );
                    }}
                  />
                </Grid>
                <Grid size={"auto"}>{values.image && workoutImg}</Grid>
              </Grid>
            </Grid>
            {touched.image && errors.image && (
              <FormHelperText error>{errors.image}</FormHelperText>
            )}
          </Grid>
          <Grid size={12}>
            <Box>
              <Typography variant="h4" mb={2}>
                {t("workoutForm.exce_sele", { count: exercises.length })}
              </Typography>
              {exercises.length === 0 && (
                <Typography sx={{ color: "grey.600" }}>
                  {t("workoutForm.no_exc_sele")}
                </Typography>
              )}
              {exercises.length !== 0 && (
                <Stack flexDirection={"row"} gap={2} flexWrap={"wrap"}>
                  {exercises.map((exerSele) => (
                    <ExerciseSelectedCard exercise={exerSele} />
                  ))}
                </Stack>
              )}
              {touched.exercises && errors.exercises && (
                <FormHelperText error>{errors.exercises}</FormHelperText>
              )}
              <FormControl margin="normal" sx={{ maxWidth: "375px" }}>
                <InputLabel> {t("workoutForm.search")}</InputLabel>
                <OutlinedInput
                  label="Search"
                  value={inputSearch}
                  onChange={(e) => {
                    setInputSearch(e.target.value);
                  }}
                  type="search"
                />
              </FormControl>
              <List
                itemCount={allExercises.length}
                itemSize={310}
                height={380}
                direction={i18n.language === "ar" ? "rtl" : "ltr"}
                width={1000}
                itemData={allExercises || []}
                layout="horizontal"
                style={{
                  width: "100%",
                }}
              >
                {ExerciseRow}
              </List>
            </Box>
          </Grid>
        </Grid>
        <Button
          {...ButtonProps}
          type="submit"
          variant="outlined"
          sx={{
            my: 2,
            width: { xs: "100%", sm: "initial" },
          }}
        >
          {t("gbtn." + task)}
        </Button>
      </form>
    </Box>
  );
};

export default WorkoutForm;
