import { FormikConfig, useFormik } from "formik";
import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
} from "@mui/material";
import { gridSpacing } from "../../../config";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid2";
import { FormLoadingButtonProps } from "../../../tables-def/loadingButtonProps";
import { useTranslation } from "react-i18next";

interface PackageFormProps {
  task?: "create" | "update";
}

interface PackageFormValues {
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  type: "group" | "personalized";
}

const PackageForm = ({
  task = "create",
  loadingButtonProps,
  ...formikConfig
}: FormikConfig<PackageFormValues> &
  PackageFormProps &
  FormLoadingButtonProps) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
  } = useFormik({ validateOnMount: true, ...formikConfig });

  const { t } = useTranslation();

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl error={!!touched.name && !!errors.name}>
              <InputLabel>{t("packageForm.name")}</InputLabel>
              <OutlinedInput
                type="text"
                name="name"
                label={t("packageForm.name")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {!!touched.name && !!errors.name && (
                <FormHelperText error>{errors.name}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl error={!!touched.name_ar && !!errors.name_ar}>
              <InputLabel>
                {t("arf", {
                  slug: t("slugs.packageName"),
                })}
              </InputLabel>
              <OutlinedInput
                type="text"
                name="name_ar"
                label={t("arf", {
                  slug: t("slugs.packageName"),
                })}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name_ar}
              />
              {!!touched.name_ar && !!errors.name_ar && (
                <FormHelperText error>{errors.name_ar}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl error={!!touched.description && !!errors.description}>
              <InputLabel>{t("packageForm.desc")}</InputLabel>
              <OutlinedInput
                type="text"
                name="description"
                label={t("packageForm.desc")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              {!!touched.description && !!errors.description && (
                <FormHelperText error>{errors.description}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl
              error={!!touched.description_ar && !!errors.description_ar}
            >
              <InputLabel>
                {t("arf", {
                  slug: t("slugs.packageDesc"),
                })}
              </InputLabel>
              <OutlinedInput
                type="text"
                name="description_ar"
                label={t("arf", {
                  slug: t("slugs.packageDesc"),
                })}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description_ar}
              />
              {!!touched.description_ar && !!errors.description_ar && (
                <FormHelperText error>{errors.description_ar}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl error={!!touched.type && !!errors.type}>
              <FormLabel>{t("packageForm.type")}</FormLabel>
              <RadioGroup
                name="type"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                row
              >
                <FormControlLabel
                  value="group"
                  control={<Radio />}
                  label={t("global.group")}
                />
                <FormControlLabel
                  value="personalized"
                  control={<Radio />}
                  label={t("global.person")}
                />
              </RadioGroup>
              {!!touched.type && !!errors.type && (
                <FormHelperText error>{errors.type}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <LoadingButton
          type="submit"
          variant="contained"
          disabled={!isValid}
          {...loadingButtonProps}
        >
          {t("gbtn." + task)}
        </LoadingButton>
      </form>
    </Box>
  );
};

export default PackageForm;
