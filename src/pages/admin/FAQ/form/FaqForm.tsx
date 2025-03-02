import {
  Box,
  FormHelperText,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FormikConfig, useFormik } from "formik";
import React from "react";
import Grid from "@mui/material/Grid2";
import { LoadingButton } from "@mui/lab";
import { FormLoadingButtonProps } from "../../../../tables-def/loadingButtonProps";
import { gridSpacing } from "../../../../config";
import { useTranslation } from "react-i18next";

interface FAQFormProps {
  task?: "create" | "update";
}

interface FAQFormValues {
  question: string;
  question_ar: string;
  answer: string;
  answer_ar: string;
}

const FAQForm = ({
  task = "create",
  loadingButtonProps,
  ...formikConfig
}: FormikConfig<FAQFormValues> & FAQFormProps & FormLoadingButtonProps) => {
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
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl
              margin="dense"
              fullWidth
              error={touched.question && Boolean(errors.question)}
            >
              <InputLabel htmlFor="question">{t("faqForm.ques")}</InputLabel>
              <OutlinedInput
                fullWidth
                id="question"
                name="question"
                label={t("faqForm.ques")}
                value={values.question}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.question && Boolean(errors.question)}
              />
              {touched.question && Boolean(errors.question) && (
                <FormHelperText>{errors.question}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl
              margin="dense"
              fullWidth
              error={touched.question_ar && Boolean(errors.question_ar)}
            >
              <InputLabel htmlFor="question_ar">
                {t("arf", { slug: t("slugs.question") })}
              </InputLabel>
              <OutlinedInput
                fullWidth
                id="question_ar"
                name="question_ar"
                label={t("faqForm.ques")}
                value={values.question_ar}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.question_ar && Boolean(errors.question_ar)}
              />
              {touched.question_ar && Boolean(errors.question_ar) && (
                <FormHelperText>{errors.question_ar}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl
              margin="dense"
              fullWidth
              error={touched.answer && Boolean(errors.answer)}
            >
              <InputLabel htmlFor="answer">{t("faqForm.ans")}</InputLabel>
              <OutlinedInput
                fullWidth
                id="answer"
                name="answer"
                label={t("faqForm.ans")}
                multiline
                rows={4}
                value={values.answer}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.answer && Boolean(errors.answer)}
              />
              {touched.answer && Boolean(errors.answer) && (
                <FormHelperText>{errors.answer}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl
              margin="dense"
              fullWidth
              error={touched.answer_ar && Boolean(errors.answer_ar)}
            >
              <InputLabel htmlFor="answer_ar">
                {t("arf", {
                  slug: t("slugs.answer"),
                })}
              </InputLabel>
              <OutlinedInput
                fullWidth
                id="answer_ar"
                name="answer_ar"
                label={t("faqForm.ans")}
                multiline
                rows={4}
                value={values.answer_ar}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.answer_ar && Boolean(errors.answer_ar)}
              />
              {touched.answer_ar && Boolean(errors.answer_ar) && (
                <FormHelperText>{errors.answer_ar}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={12}>
            <LoadingButton
              fullWidth
              variant="outlined"
              type="submit"
              disabled={!isValid}
              sx={{
                width: { xs: "100%", sm: "fit-content" },
              }}
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

export default FAQForm;
