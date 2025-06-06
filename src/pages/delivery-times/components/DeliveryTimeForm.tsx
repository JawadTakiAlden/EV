import { FormikConfig, useFormik } from "formik";
import React, { useEffect } from "react";
import { FormButtonProps } from "../../../tables-def/loadingButtonProps";
import { Button, Grid } from "@mui/material";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { gridSpacing } from "../../../config";
import { useTranslation } from "react-i18next";

export interface DeliveryTimeValue {
  id?: number;
  title: string;
  title_ar: string;
}

interface DeliveryTimeFormProps {
  task?: "create" | "update";
}

const DeliveryTimeForm = ({
  task = "create",
  initialValues,
  ButtonProps,
  ...formikConfig
}: FormikConfig<DeliveryTimeValue> &
  DeliveryTimeFormProps &
  FormButtonProps) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues,
    ...formikConfig,
  });

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues, setValues]);

  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={gridSpacing}>
        <Grid size={6}>
          <FormControl error={!!errors.title && !!touched.title}>
            <InputLabel>{t("deliveryTime.form.title")}</InputLabel>
            <OutlinedInput
              name="title"
              label={t("deliveryTime.form.title")}
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
                slug: t("slugs.deliveryTime"),
              })}
            </InputLabel>
            <OutlinedInput
              name="title_ar"
              label={t("arf", {
                slug: t("slugs.deliveryTime"),
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
        <Grid size={12}>
          <Button
            variant="outlined"
            type="submit"
            disabled={!values.title}
            sx={{ width: { xs: "100%", sm: "initial" } }}
            {...ButtonProps}
          >
            {t("gbtn." + task)}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DeliveryTimeForm;
