import { Box, FormHelperText, Typography } from "@mui/material";
import { FormikConfig, useFormik } from "formik";
import React, { useMemo } from "react";
import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../../config";
import FileImagePicker from "../../../components/FileImagePicker";
import { LoadingButton } from "@mui/lab";
import { FormLoadingButtonProps } from "../../../tables-def/loadingButtonProps";
import { useTranslation } from "react-i18next";

interface BannerFormProps {
  task?: "create" | "update";
}

interface BannerFormValues {
  image: string | null | File;
}

const BannerForm = ({
  task = "create",
  loadingButtonProps,
  ...formikConfig
}: FormikConfig<BannerFormValues> &
  BannerFormProps &
  FormLoadingButtonProps) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleSubmit,
    isValid,
    setFieldValue,
  } = useFormik({
    validateOnMount: true,
    ...formikConfig,
  });

  const { t } = useTranslation();

  const memoziedImage = useMemo(() => {
    return (
      values.image && (
        <img
          src={
            typeof values.image === "string"
              ? values.image
              : URL.createObjectURL(values.image as unknown as MediaSource)
          }
          alt="meal"
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
          <Grid size={12}>
            <Grid container columnSpacing={1}>
              <Grid size={"grow"}>
                <FileImagePicker
                  title={t("imagePicker.title", {
                    slug: t("slugs.banner"),
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
            {!!errors.image && !!touched.image && (
              <FormHelperText error>{errors.image}</FormHelperText>
            )}
          </Grid>
          <Grid size={12}>
            <LoadingButton
              fullWidth
              variant="outlined"
              type="submit"
              disabled={!isValid}
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

export default BannerForm;
