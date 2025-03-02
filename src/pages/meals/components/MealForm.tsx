import React, { useMemo } from "react";
import * as Yup from "yup";
import { FormikConfig, useFormik } from "formik";
import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../../config";
import useGetTypes from "../../../api/type/useGetTypes";
import { MealType } from "../../../tables-def/meal-types";
import { FormLoadingButtonProps } from "../../../tables-def/loadingButtonProps";
import FileImagePicker from "../../../components/FileImagePicker";
import { MealIngreadiant } from "../../../tables-def/meal-ingrediant";
import { useGetIngredients } from "../../../api/ingredients";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../../utils/useGetTranslation";

// Updated Validation Schema
export const mealValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required.")
    .max(255, "Name cannot exceed 255 characters."),
  description: Yup.string().max(
    500,
    "Description cannot exceed 500 characters."
  ),
  calories: Yup.number().nullable().min(0, "Calories cannot be negative."),
  protein: Yup.number().nullable().min(0, "Protein cannot be negative."),
  carbohydrates: Yup.number()
    .nullable()
    .min(0, "Carbohydrates cannot be negative."),
  fats: Yup.number().nullable().min(0, "Fats cannot be negative."),
  fiber: Yup.number().nullable().min(0, "Fiber cannot be negative."),
  image_url_url: Yup.string()
    .nullable()
    .url("image_url URL must be a valid URL."),
  // can_be_skipped: Yup.boolean(),
  // can_be_modified: Yup.boolean(),
});
export interface CustomIngredient extends MealIngreadiant {
  quantity: number;
}
interface MealFormValues {
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  calories: number;
  protein: number;
  carb: number;
  fats: number;
  fiber: number;
  images: string[] | File[];
  types: MealType[];
  ingredients: CustomIngredient[];
}

interface ExerciseFormProps {
  task?: "create" | "update";
}

const MealForm = ({
  task = "create",
  loadingButtonProps,
  ...formikProps
}: FormikConfig<MealFormValues> &
  ExerciseFormProps &
  FormLoadingButtonProps) => {
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

  const { getTranslation2 } = useGetTranslation();

  const mealImages = useMemo(() => {
    return (
      values.images?.length > 0 && (
        <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
          {values.images?.map((image, i) => {
            return (
              <img
                key={i}
                src={
                  typeof image === "string"
                    ? image
                    : URL.createObjectURL(image as unknown as MediaSource)
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
            );
          })}
        </Stack>
      )
    );
  }, [values.images.length]);

  const mealTypes = useGetTypes();
  const mealIngredients = useGetIngredients();

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={gridSpacing}>
          <Grid size={12}>
            <FormControl>
              <InputLabel>{t("mealForm.name")}</InputLabel>
              <OutlinedInput
                name="name"
                label={t("mealForm.name")}
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {!!touched.name && !!errors.name && (
                <FormHelperText error>{errors.name}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl>
              <InputLabel>
                {t("arf", {
                  slug: t("slugs.name"),
                })}
              </InputLabel>
              <OutlinedInput
                name="name_ar"
                label={t("arf", {
                  slug: t("slugs.name"),
                })}
                type="text"
                value={values.name_ar}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {!!touched.name_ar && !!errors.name_ar && (
                <FormHelperText error>{errors.name_ar}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl>
              <InputLabel>{t("mealForm.desc")}</InputLabel>
              <OutlinedInput
                name="description"
                label={t("mealForm.desc")}
                type="text"
                value={values.description}
                multiline
                rows={4}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {!!touched.description && !!errors.description && (
                <FormHelperText error>{errors.description}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl>
              <InputLabel>
                {t("arf", {
                  slug: t("slugs.description"),
                })}
              </InputLabel>
              <OutlinedInput
                name="description_ar"
                label={t("arf", {
                  slug: t("slugs.description"),
                })}
                type="text"
                value={values.description_ar}
                multiline
                rows={4}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {!!touched.description_ar && !!errors.description_ar && (
                <FormHelperText error>{errors.description_ar}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl>
              <InputLabel>{t("mealForm.calories")}</InputLabel>
              <OutlinedInput
                name="calories"
                label={t("mealForm.calories")}
                type="number"
                value={values.calories}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {!!touched.calories && !!errors.calories && (
                <FormHelperText error>{errors.calories}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* Added Inputs for Macros */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl>
              <InputLabel>{t("mealForm.protein")}</InputLabel>
              <OutlinedInput
                name="protein"
                label={t("mealForm.protein")}
                type="number"
                value={values.protein}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {!!touched.protein && !!errors.protein && (
                <FormHelperText error>{errors.protein}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl>
              <InputLabel>{t("mealForm.carb")}</InputLabel>
              <OutlinedInput
                name="carb"
                label={t("mealForm.carb")}
                type="number"
                value={values.carb}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {!!touched.carb && !!errors.carb && (
                <FormHelperText error>{errors.carb}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl>
              <InputLabel>{t("mealForm.fats")}</InputLabel>
              <OutlinedInput
                name="fats"
                label={t("mealForm.fats")}
                type="number"
                value={values.fats}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {!!touched.fats && !!errors.fats && (
                <FormHelperText error>{errors.fats}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl>
              <InputLabel>{t("mealForm.fiber")}</InputLabel>
              <OutlinedInput
                name="fiber"
                label={t("mealForm.fiber")}
                type="number"
                value={values.fiber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {!!touched.fiber && !!errors.fiber && (
                <FormHelperText error>{errors.fiber}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {/* <FormControl error={!!touched.type && !!errors.type}> */}
            <Autocomplete
              multiple
              id="meal_types"
              disableCloseOnSelect
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.title}
              onChange={(e, newVlaue) => {
                setFieldValue("types", newVlaue);
              }}
              value={values.types}
              loading={mealTypes.isLoading}
              getOptionKey={(option) => option.id}
              options={mealTypes?.data?.data || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("mealForm.types")}
                  placeholder="meal types"
                />
              )}
            />
            {/* </FormControl> */}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {/* <FormControl error={!!touched.type && !!errors.type}> */}
            <Autocomplete
              multiple
              id="ingredients"
              disableCloseOnSelect
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.title}
              onChange={(e, newVlaue) => {
                setFieldValue("ingredients", newVlaue);
              }}
              value={values.ingredients}
              loading={mealIngredients.isLoading}
              getOptionKey={(option) => option.id}
              options={mealIngredients?.data?.data || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("mealForm.ingredients")}
                  placeholder="meal ingredient"
                />
              )}
            />
          </Grid>
          {values.ingredients.length > 0 && (
            <Grid size={12}>
              <Box sx={{ p: 4, width: "100%" }}>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "calc(16px + 0.09vw)",
                  }}
                >
                  {t("mealForm.manageQun")}
                </Typography>
                {values.ingredients.map((ingr) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        columnGap: "10px",
                        alignItems: "baseline",
                        flexDirection: { xs: "column", sm: "row" },
                        my: 2,
                      }}
                    >
                      <Typography sx={{ width: "30%", maxWidth: "100px" }}>
                        {getTranslation2(ingr, "title")}({ingr.unit})
                      </Typography>
                      <TextField
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={ingr.quantity}
                        onChange={(e) => {
                          const newIngredients = values.ingredients.map(
                            (ing) => {
                              if (ing.id === ingr.id) {
                                return {
                                  ...ingr,
                                  quantity: e.target.value,
                                };
                              }
                              return ing;
                            }
                          );
                          setFieldValue("ingredients", newIngredients);
                        }}
                        sx={{
                          maxWidth: "400px",
                          flex: 1,
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          )}
          <Grid size={12}>
            <Grid size={12}>{mealImages}</Grid>
            <Grid container columnSpacing={gridSpacing}>
              <Grid size={"grow"}>
                <FileImagePicker
                  title={t("imagePicker.title", {
                    slug: t("slugs.meal"),
                  })}
                  onSelectImage={(files) => {
                    if (files !== null && files.length > 0) {
                      setFieldValue("images", [...values.images, files?.[0]]);
                    }
                  }}
                  name="images"
                  accept="images/png,image_url/jpg,image_url/jpeg"
                  id="images"
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
            </Grid>
          </Grid>
          <Grid size={12}>
            <LoadingButton
              sx={{ my: 1, width: { xs: "100%", sm: "initial" } }}
              variant="outlined"
              type="submit"
              {...loadingButtonProps}
            >
              {t("gbtn." + task)}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default MealForm;
