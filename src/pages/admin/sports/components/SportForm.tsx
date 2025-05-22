import React from "react";
import { FormButtonProps } from "../../../../tables-def/loadingButtonProps";
import { FormikConfig, useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  styled,
} from "@mui/material";

import { FaCloudUploadAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface SportFormProps {
  task?: "create" | "update";
}

interface SportFormVlaues {
  title: string;
  title_ar: string;
  image: string | File | null;
}
const SportForm = ({
  task = "create",
  ButtonProps,
  ...formikConfig
}: FormikConfig<SportFormVlaues> & SportFormProps & FormButtonProps) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isValid,
  } = useFormik({
    validateOnMount: true,
    ...formikConfig,
  });

  const { t } = useTranslation();
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl
          margin="dense"
          fullWidth
          error={touched.title && Boolean(errors.title)}
        >
          <InputLabel>{t("sports.form.title")}</InputLabel>
          <OutlinedInput
            fullWidth
            id="title"
            name="title"
            label={t("sports.form.title")}
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
          />
          {touched.title && Boolean(errors.title) && (
            <FormHelperText>{errors.title}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          margin="dense"
          fullWidth
          error={touched.title && Boolean(errors.title)}
        >
          <InputLabel>
            {t("arf", {
              slug: t("slugs.title"),
            })}
          </InputLabel>
          <OutlinedInput
            fullWidth
            id="title_ar"
            name="title_ar"
            label={t("arf", {
              slug: t("slugs.title"),
            })}
            value={values.title_ar}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title_ar && Boolean(errors.title_ar)}
          />
          {touched.title_ar && Boolean(errors.title_ar) && (
            <FormHelperText>{errors.title_ar}</FormHelperText>
          )}
        </FormControl>
        <Box>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<FaCloudUploadAlt />}
          >
            {t("sports.form.image")}
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => {
                setFieldValue("image", event.target.files?.[0]);
              }}
              accept="image/png,image/jpg,image/jpeg"
            />
          </Button>
          {values.image
            ? typeof values.image === "string"
              ? t("sports.form.update")
              : values.image.name
            : undefined}
        </Box>
        <Button
          fullWidth
          variant="outlined"
          type="submit"
          disabled={!isValid}
          sx={{
            width: { xs: "100%", sm: "fit-content" },
          }}
          {...ButtonProps}
        >
          {t("gbtn." + task)}
        </Button>
      </form>
    </Box>
  );
};

export default SportForm;
