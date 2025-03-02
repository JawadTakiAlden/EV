import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { usePushNotification } from "../../../api/notification";
import { useTranslation } from "react-i18next";

const Notification = () => {
  const pushNotification = usePushNotification();
  const { t } = useTranslation();
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        body: "",
      },
      onSubmit: (values) => {
        pushNotification.mutate(values);
      },
      validationSchema: yup.object().shape({
        title: yup.string().max(255).required().label(t("notification.title")),
        body: yup.string().required().label(t("notification.body")),
      }),
    });

  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t("notification.send")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl
          fullWidth
          margin="normal"
          error={!!touched.title && !!errors.title}
        >
          <InputLabel htmlFor="title">{t("notification.title")}</InputLabel>
          <OutlinedInput
            id="title"
            label={t("notification.title")}
            name="title"
            type="text"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {!!touched.title && !!errors.title && (
            <FormHelperText>{errors.title}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          margin="normal"
          error={!!touched.body && !!errors.body}
        >
          <InputLabel htmlFor="body">{t("notification.body")}</InputLabel>
          <OutlinedInput
            id="body"
            label={t("notification.body")}
            multiline
            minRows={4}
            maxRows={5}
            name="body"
            value={values.body}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {!!touched.body && !!errors.body && (
            <FormHelperText>{errors.body}</FormHelperText>
          )}
        </FormControl>
        <LoadingButton
          loading={pushNotification.isPending}
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          {t("notification.send_act")}
        </LoadingButton>
      </form>
    </Box>
  );
};

export default Notification;
