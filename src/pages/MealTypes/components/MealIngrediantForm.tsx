import { FormikConfig, useFormik } from "formik";
import React, { useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../../config";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import FileImagePicker from "../../../components/FileImagePicker";
import { useTranslation } from "react-i18next";
import { FormLoadingButtonProps } from "../../../tables-def/loadingButtonProps";

export interface MealIngrediantVlaue {
  id?: number;
  title: string;
  title_ar: string;
  stock: number;
  unit: string;
  image: File | null | string;
}

interface MealIngrediantFormProps {
  task?: "create" | "update";
}

const MealIngrediantForm = ({
  task = "create",
  initialValues,
  loadingButtonProps,
  ...formikConfig
}: FormikConfig<MealIngrediantVlaue> &
  MealIngrediantFormProps &
  FormLoadingButtonProps) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    setFieldValue,
  } = useFormik({
    initialValues,
    validateOnMount: true,
    ...formikConfig,
  });

  const { t } = useTranslation();

  const mealImages = useMemo(() => {
    return (
      values.image && (
        <img
          src={
            typeof values.image === "string"
              ? values.image
              : URL.createObjectURL(values.image as unknown as MediaSource)
          }
          alt={values.title}
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
    <form onSubmit={handleSubmit}>
      <Grid container spacing={gridSpacing}>
        <Grid size={6}>
          <FormControl error={!!errors.title && !!touched.title}>
            <InputLabel>{t("ingredientForm.title")}</InputLabel>
            <OutlinedInput
              name="title"
              label={t("ingredientForm.title")}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              type="text"
            />
            {!!errors.title && !!touched.title && (
              <FormHelperText error>{errors.title}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl error={!!errors.title_ar && !!touched.title_ar}>
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
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title_ar}
              type="text"
            />
            {!!errors.title_ar && !!touched.title_ar && (
              <FormHelperText error>{errors.title_ar}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl error={!!errors.title && !!touched.title}>
            <InputLabel>{t("ingredientForm.stock")}</InputLabel>
            <OutlinedInput
              name="stock"
              label={t("ingredientForm.stock")}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.stock}
              inputProps={{
                min: 0,
              }}
              type="number"
            />
            {!!errors.stock && !!touched.stock && (
              <FormHelperText error>{errors.stock}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel>{t("ingredientForm.unit")}</InputLabel>
            <Select
              fullWidth
              label={t("ingredientForm.unit")}
              value={values.unit}
              onChange={handleChange}
              name="unit"
            >
              <MenuItem value={"kg"}>{t("unit.kg")}</MenuItem>
              <MenuItem value={"g"}>{t("unit.g")}</MenuItem>
              <MenuItem value={"ml"}>{t("unit.ml")}</MenuItem>
              <MenuItem value={"l"}>{t("unit.l")}</MenuItem>
              <MenuItem value={"lb"}>{t("unit.lb")}</MenuItem>
              <MenuItem value={"tbsp"}>{t("unit.tbsp")}</MenuItem>
              <MenuItem value={"tsp"}>{t("unit.tsp")}</MenuItem>
              <MenuItem value={"pcs"}>{t("unit.pcs")}</MenuItem>
            </Select>
            {!!errors.unit && !!touched.unit && (
              <FormHelperText error>{errors.unit}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={6}>
          <Grid container columnSpacing={gridSpacing}>
            <Grid size={"auto"}>{mealImages}</Grid>
            <Grid size={"grow"}>
              <FileImagePicker
                title={t("imagePicker.title", {
                  slug: t("slugs.ingredient"),
                })}
                onSelectImage={(files) => {
                  if (files !== null && files.length > 0) {
                    setFieldValue("image", files?.[0]);
                  }
                }}
                name="images"
                accept="image/png,image/jpg,image/jpeg"
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
            variant="outlined"
            type="submit"
            disabled={!isValid}
            sx={{ width: { xs: "100%", sm: "initial" } }}
            {...loadingButtonProps}
          >
            {t("gbtn." + task)}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default MealIngrediantForm;
