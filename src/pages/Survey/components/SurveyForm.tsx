import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { FormikConfig, useFormik } from "formik";
import React from "react";
import { gridSpacing } from "../../../config";
import { LoadingButton } from "@mui/lab";
import { FormLoadingButtonProps } from "../../../tables-def/loadingButtonProps";
import { useTranslation } from "react-i18next";

interface SurveyFormProps {
  task?: "create" | "update";
  dir?: "row" | "column";
}

export interface SurveyFormValue {
  title: string;
  title_ar: string;
  package_id?: number;
}

const SurveyForm = ({
  task = "create",
  dir = "row",
  loadingButtonProps,
  ...formikConfig
}: FormikConfig<SurveyFormValue> &
  SurveyFormProps &
  FormLoadingButtonProps) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
  } = useFormik({
    validateOnMount: true,
    ...formikConfig,
  });

  const { t } = useTranslation();

  return (
    <Box sx={{ minWidth: "300px" }}>
      <form onSubmit={handleSubmit}>
        <Stack flexDirection={dir} gap={gridSpacing}>
          <FormControl error={!!touched.title && !!errors.title}>
            <InputLabel>{t("surveyForm.title")}</InputLabel>
            <OutlinedInput
              name="title"
              label={t("surveyForm.title")}
              type="text"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {!!touched.title && !!errors.title && (
              <FormHelperText error>{errors.title}</FormHelperText>
            )}
          </FormControl>
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
          <LoadingButton
            sx={{ minWidth: "200px" }}
            disabled={!isValid}
            variant="outlined"
            type={"submit"}
            {...loadingButtonProps}
          >
            {t("gbtn." + task)}
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default SurveyForm;
