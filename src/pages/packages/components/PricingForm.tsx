import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { FormikConfig, useFormik } from "formik";
import React from "react";
import { gridSpacing } from "../../../config";

import { FormButtonProps } from "../../../tables-def/loadingButtonProps";
import { useTranslation } from "react-i18next";

interface PriceFormProps {
  task?: "create" | "update";
  dir?: "row" | "column";
}

export interface PriceFormValue {
  title: string;
  title_ar: string;
  price: number;
  number_of_days: number;
  package_id: number | string;
}

const PricingForm = ({
  task = "create",
  dir = "row",
  ButtonProps,
  ...formikConfig
}: FormikConfig<PriceFormValue> & PriceFormProps & FormButtonProps) => {
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
            <InputLabel>{t("pricingForm.title")}</InputLabel>
            <OutlinedInput
              name="title"
              label={t("pricingForm.title")}
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
              label="Price Title"
              type="text"
              value={values.title_ar}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {!!touched.title_ar && !!errors.title_ar && (
              <FormHelperText error>{errors.title_ar}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!touched.price && !!errors.price}>
            <InputLabel>{t("pricingForm.price")}</InputLabel>
            <OutlinedInput
              name="price"
              label={t("pricingForm.price")}
              type="number"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {!!touched.price && !!errors.price && (
              <FormHelperText error>{errors.price}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            error={!!touched.number_of_days && !!errors.number_of_days}
          >
            <InputLabel>{t("pricingForm.numberOfDays")}</InputLabel>
            <OutlinedInput
              name="number_of_days"
              label={t("pricingForm.numberOfDays")}
              type="number"
              value={values.number_of_days}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {!!touched.number_of_days && !!errors.number_of_days && (
              <FormHelperText error>{errors.number_of_days}</FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Button
          disabled={!isValid}
          variant="outlined"
          type="submit"
          {...ButtonProps}
        >
          {t("gbtn." + task)}
        </Button>
      </form>
    </Box>
  );
};

export default PricingForm;
