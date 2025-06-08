import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Switch,
} from "@mui/material";
import { Formik, FormikConfig, useFormik } from "formik";
import React from "react";
import { CreateCoupon } from "../../../tables-def/coupons";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { FormButtonProps } from "../../../tables-def/loadingButtonProps";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { gridSpacing } from "../../../config";

export type CouponFormProps = {
  task?: "create" | "update";
};

const CouponForm = ({
  task = "create",
  ButtonProps,
  ...formikConfig
}: FormikConfig<CreateCoupon> & CouponFormProps & FormButtonProps) => {
  const { t } = useTranslation();
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    isValid,
    setFieldValue,
  } = useFormik({
    validateOnMount: true,
    ...formikConfig,
  });
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={gridSpacing}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={!!errors.code && !!touched.code}>
            <InputLabel>{t("couponForm.code")}</InputLabel>
            <OutlinedInput
              value={values.code}
              label={t("couponForm.code")}
              onChange={handleChange}
              onBlur={handleBlur}
              name="code"
            />
            {!!errors.code && !!touched.code && (
              <FormHelperText>{errors.code}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl
            fullWidth
            error={!!errors.discount_value && !!touched.discount_value}
          >
            <InputLabel>{t("couponForm.discount_value")}</InputLabel>
            <OutlinedInput
              label={t("couponForm.discount_value")}
              value={values.discount_value}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              name="discount_value"
            />
            {!!errors.discount_value && !!touched.discount_value && (
              <FormHelperText>{errors.discount_value}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl
            fullWidth
            error={!!errors.usage_limit && !!touched.usage_limit}
          >
            <InputLabel>{t("couponForm.usage_limit")}</InputLabel>
            <OutlinedInput
              value={values.usage_limit}
              onChange={handleChange}
              label={t("couponForm.discount_value")}
              type="number"
              onBlur={handleBlur}
              name="usage_limit"
            />
            {!!errors.usage_limit && !!touched.usage_limit && (
              <FormHelperText>{errors.usage_limit}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label={t("couponForm.expiry_date")}
              name="expiry_date"
              id="expiry_date"
              value={values.expiry_date}
              onBlur={handleBlur}
              minDate={dayjs()}
              onChange={(newValue: any) => {
                setFieldValue("expiry_date", dayjs(newValue));
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            label={t("table.active")}
            checked={values.is_active}
            control={<Switch onChange={handleChange} name="is_active" />}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button variant="contained" type="submit" {...ButtonProps}>
            {t("gbtn." + task)}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CouponForm;
