import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { FormikConfig, useFormik } from "formik";
import React, { useMemo } from "react";
import { gridSpacing } from "../../../config";
import { Grid } from "@mui/material";
import { MealType } from "../../../tables-def/meal-types";
import FileImagePicker from "../../../components/FileImagePicker";

import useGetTypes from "../../../api/type/useGetTypes";
import { FormButtonProps } from "../../../tables-def/loadingButtonProps";
import { useTranslation } from "react-i18next";
interface MealPlanFormVlaues {
  title: string;
  title_ar: string;
  calories: number | undefined;
  image: string | null | File;
  price_monthly: undefined | number;
  types: MealType[];
}

interface MealPlanFormProps {
  task?: "create" | "update";
}

const MealPlanForm = ({
  task = "create",
  ButtonProps,
  ...formikConfig
}: FormikConfig<MealPlanFormVlaues> & MealPlanFormProps & FormButtonProps) => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    ...formikConfig,
  });

  const { t } = useTranslation();

  const mealTypes = useGetTypes();

  const memoziedImage = useMemo(() => {
    return (
      values.image && (
        <img
          src={
            typeof values.image === "string"
              ? values.image
              : URL.createObjectURL(values.image as unknown as MediaSource)
          }
          alt="meal plan "
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

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={gridSpacing}>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{
              minWidth: "300px",
            }}
          >
            <FormControl error={!!touched.title && !!errors.title}>
              <InputLabel>{t("mealPlanForm.title")}</InputLabel>
              <OutlinedInput
                name="title"
                label={t("mealPlanForm.title")}
                type="text"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {!!touched.title && !!errors.title && (
                <FormHelperText error>{errors.title}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{
              minWidth: "300px",
            }}
          >
            <FormControl error={!!touched.title_ar && !!errors.title_ar}>
              <InputLabel>
                {t("arf", {
                  slug: t("slugs.title"),
                })}
              </InputLabel>
              <OutlinedInput
                name="title_ar"
                label={t("arf", {
                  slug: t("slugs.title"),
                })}
                type="text"
                value={values.title_ar}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {!!touched.title_ar && !!errors.title_ar && (
                <FormHelperText error>{errors.title_ar}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{
              minWidth: "300px",
            }}
          >
            <FormControl error={!!touched.calories && !!errors.calories}>
              <InputLabel>{t("mealPlanForm.calories")}</InputLabel>
              <OutlinedInput
                name="calories"
                label={t("mealPlanForm.calories")}
                type="number"
                value={values.calories}
                onChange={handleChange}
                inputProps={{
                  min: 0,
                }}
                onBlur={handleBlur}
              />
              {!!touched.calories && !!errors.calories && (
                <FormHelperText error>{errors.calories}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{
              minWidth: "300px",
            }}
          >
            <Grid container spacing={0}>
              <Grid
                size={12}
                sx={{
                  minWidth: "300px",
                }}
              >
                <FormControl
                  error={!!touched.price_monthly && !!errors.price_monthly}
                >
                  <InputLabel>{t("mealPlanForm.price")}</InputLabel>
                  <OutlinedInput
                    name="price_monthly"
                    label={t("mealPlanForm.price")}
                    type="number"
                    value={values.price_monthly}
                    onChange={handleChange}
                    inputProps={{
                      min: 0,
                    }}
                    onBlur={handleBlur}
                  />
                  {!!touched.price_monthly && !!errors.price_monthly && (
                    <FormHelperText error>
                      {errors.price_monthly}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid
                size={12}
                sx={{
                  minWidth: "300px",
                }}
              >
                <FormControl error={!!touched.types && !!errors.types}>
                  <Autocomplete
                    multiple
                    id="types"
                    disableCloseOnSelect
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option.title}
                    onChange={(e, newVlaue) => {
                      setFieldValue("types", newVlaue);
                    }}
                    value={values.types}
                    loading={mealTypes.isLoading}
                    getOptionKey={(option) => option.id}
                    options={mealTypes?.data?.data || []}
                    renderInput={(params) => (
                      <TextField {...params} label={t("mealPlanForm.types")} />
                    )}
                  />
                  {/* {!!touched.meal_types && !!errors.meal_types && (
                    <FormHelperText error>{errors.meal_types}</FormHelperText>
                  )} */}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Grid container columnSpacing={2}>
              <Grid size="grow">
                <FileImagePicker
                  title={t("imagePicker.title", {
                    slug: t("slugs.meal_plan"),
                  })}
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
              <Grid size="auto">{memoziedImage}</Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Button
              type="submit"
              variant="outlined"
              sx={{ width: { xs: "100%", sm: "initial" } }}
              {...ButtonProps}
            >
              {t("gbtn." + task)}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default MealPlanForm;
