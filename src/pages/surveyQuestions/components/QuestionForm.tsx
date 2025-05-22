import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { FormikConfig, useFormik } from "formik";
import React, { useMemo } from "react";
import FileImagePicker from "../../../components/FileImagePicker";
import { Grid } from "@mui/material";
import { gridSpacing } from "../../../config";

import { FormButtonProps } from "../../../tables-def/loadingButtonProps";
import { useTranslation } from "react-i18next";

interface QuestionFormValues {
  title: string;
  title_ar: string;
  image: string | null | File;
  type: "normal" | "choice";
  choices?: string[];
}

const QuestionForm = ({
  task = "create",
  ButtonProps,
  ...formikConfig
}: FormikConfig<QuestionFormValues> & {
  task?: "create" | "update";
} & FormButtonProps) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    ...formikConfig,
  });

  const { t } = useTranslation();
  const memoziedQuestionImage = useMemo(() => {
    return (
      values.image && (
        <Box
          sx={{
            width: "100%",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <img
            alt="new question"
            src={
              typeof values.image === "string"
                ? values.image
                : URL.createObjectURL(values.image as unknown as MediaSource)
            }
            style={{
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      )
    );
  }, [values.image]);
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel id="type">{t("questionForm.type")}</FormLabel>
          <RadioGroup
            value={values.type}
            onChange={handleChange}
            row
            aria-labelledby="type"
            name="type"
            defaultValue="end"
          >
            <FormControlLabel
              value="normal"
              control={<Radio />}
              label={t("questionForm.normal")}
              labelPlacement="end"
            />
            <FormControlLabel
              value="choice"
              control={<Radio />}
              label={t("questionForm.choices")}
            />
          </RadioGroup>
        </FormControl>
        <Grid container spacing={gridSpacing} alignItems={"stretch"}>
          <Grid size={"grow"}>
            <FileImagePicker
              title={t("imagePicker", {
                slug: t("slugs.Question"),
              })}
              containerProps={{
                sx: {
                  height: "100%",
                },
              }}
              onSelectImage={(files) => {
                setFieldValue("image", files?.[0]);
              }}
              name="question_image"
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
            {touched.image && errors.image && (
              <FormHelperText error>{errors.image}</FormHelperText>
            )}
          </Grid>
          <Grid
            size={"auto"}
            sx={{ maxWidth: "200px", maxHeight: "200px", overflowY: "auto" }}
          >
            {memoziedQuestionImage}
          </Grid>
        </Grid>

        <FormControl fullWidth error={Boolean(touched.title && errors.title)}>
          <InputLabel htmlFor="name">{t("questionForm.question")}</InputLabel>
          <OutlinedInput
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            label={t("questionForm.question")}
            type="text"
          />
          {touched.title && errors.title && (
            <FormHelperText error>{errors.title}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          error={Boolean(touched.title_ar && errors.title_ar)}
        >
          <InputLabel htmlFor="name">
            {t("arf", {
              slug: t("slugs.question"),
            })}
          </InputLabel>
          <OutlinedInput
            id="title_ar"
            name="title_ar"
            value={values.title_ar}
            onChange={handleChange}
            onBlur={handleBlur}
            label={t("arf", {
              slug: t("slugs.question"),
            })}
            type="text"
          />
          {touched.title_ar && errors.title_ar && (
            <FormHelperText error>{errors.title_ar}</FormHelperText>
          )}
        </FormControl>
        {values.type === "choice" && (
          <Autocomplete
            multiple
            id="tags-filled"
            options={[]}
            defaultValue={values.choices}
            onChange={(e, newVlaue) => {
              setFieldValue("choices", newVlaue);
            }}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) => {
              return value.map((option: string, index: number) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    variant="outlined"
                    label={option}
                    key={key}
                    {...tagProps}
                  />
                );
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={t("questionForm.choices")}
                placeholder="body building"
              />
            )}
          />
        )}

        <Button fullWidth type="submit" variant="outlined" {...ButtonProps}>
          {t("gbtn." + task)}
        </Button>
      </form>
    </Box>
  );
};

export default QuestionForm;
