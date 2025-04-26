import React, { useMemo } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Box,
  Typography,
  Stack,
  Autocomplete,
  Chip,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../../config";
import { FormikConfig, useFormik } from "formik";
import FileImagePicker from "../../../components/FileImagePicker";
import ReactPlayer from "react-player";
import { FormLoadingButtonProps } from "../../../tables-def/loadingButtonProps";
import { LoadingButton } from "@mui/lab";
import { MdDeleteSweep } from "react-icons/md";
import { useTranslation } from "react-i18next";

interface ExerciseFormProps {
  task: "create" | "update";
  progress?: number;
}

interface ExerciseFormValues {
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  cooling_time: number;
  // duration: number;
  images: string[] | File[];
  target_muscles_image: null | string | File;
  video: null | string | File;
  notes: string[];
  notes_ar: string[];
}

const ExerciseForm = ({
  task,
  loadingButtonProps,
  progress,
  ...formikProps
}: FormikConfig<ExerciseFormValues> &
  ExerciseFormProps &
  FormLoadingButtonProps) => {
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
  } = useFormik<ExerciseFormValues>({
    ...formikProps,
  });

  const { t } = useTranslation();

  const exerciseImg = useMemo(() => {
    return (
      values.images?.length > 0 && (
        <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
          {values.images?.map((image, i) => {
            return (
              <Box sx={{ position: "relative" }}>
                <img
                  key={i}
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image as unknown as MediaSource)
                  }
                  alt="exercise "
                  style={{
                    width: "150px",
                    height: "100%",
                    borderRadius: "6px",
                    maxHeight: "150px",
                    objectFit: "contain",
                    maxWidth: "100%",
                  }}
                />
                <Box
                  sx={{
                    py: 0.5,
                    px: 0.5,
                    borderRadius: "4px",
                    backgroundColor: "background.paper",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      const filterImages = values.images.filter(
                        (img, imageIndex) => {
                          return i !== imageIndex;
                        }
                      );

                      setFieldValue("images", filterImages);
                    }}
                    color="error"
                    size="small"
                  >
                    <MdDeleteSweep />
                  </IconButton>
                </Box>
              </Box>
            );
          })}
        </Stack>
      )
    );
  }, [values.images.length]);

  const targetImage = useMemo(() => {
    return (
      values.target_muscles_image && (
        <img
          src={
            typeof values.target_muscles_image === "string"
              ? values.target_muscles_image
              : URL.createObjectURL(
                  values.target_muscles_image as unknown as MediaSource
                )
          }
          alt="target muscles"
          style={{
            width: "150px",
            height: "100%",
            maxHeight: "150px",
            borderRadius: "6px",
            objectFit: "contain",
            maxWidth: "100%",
          }}
        />
      )
    );
  }, [values.target_muscles_image]);

  const exerciseVideo = useMemo(() => {
    return (
      values.video && (
        <ReactPlayer
          controls
          width={"100%"}
          height={400}
          url={
            typeof values.video === "string"
              ? values.video
              : URL.createObjectURL(values.video as unknown as MediaSource)
          }
        />
      )
    );
  }, [values.video]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={gridSpacing}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
            <InputLabel htmlFor="name">{t("createExc.name")}</InputLabel>
            <OutlinedInput
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              label={t("createExc.name")}
            />
            {touched.name && errors.name && (
              <FormHelperText>{errors.name}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl
            fullWidth
            error={Boolean(touched.name_ar && errors.name_ar)}
          >
            <InputLabel htmlFor="name_ar">
              {t("arf", {
                slug: t("slugs.name"),
              })}
            </InputLabel>
            <OutlinedInput
              id="name_ar"
              name="name_ar"
              value={values.name_ar}
              onChange={handleChange}
              onBlur={handleBlur}
              label={t("arf", {
                slug: t("slugs.name"),
              })}
            />
            {touched.name_ar && errors.name_ar && (
              <FormHelperText>{errors.name_ar}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        {/* <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl
            fullWidth
            error={Boolean(touched.duration && errors.duration)}
          >
            <InputLabel htmlFor="duration">Duration (minutes)</InputLabel>
            <OutlinedInput
              id="duration"
              name="duration"
              type="number"
              value={values.duration}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Duration"
            />
            {touched.duration && errors.duration && (
              <FormHelperText>{errors.duration}</FormHelperText>
            )}
          </FormControl>
        </Grid> */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl
            fullWidth
            error={Boolean(touched.description_ar && errors.description_ar)}
          >
            <InputLabel htmlFor="description_ar">
              {t("createExc.description")}
            </InputLabel>
            <OutlinedInput
              id="description_ar"
              name="description_ar"
              value={values.description_ar}
              onChange={handleChange}
              onBlur={handleBlur}
              label={t("createExc.description")}
              multiline
              rows={5}
            />
            {touched.description_ar && errors.description_ar && (
              <FormHelperText>{errors.description_ar}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl
            fullWidth
            error={Boolean(touched.description && errors.description)}
          >
            <InputLabel htmlFor="description">
              {t("arf", {
                slug: t("slugs.description"),
              })}
            </InputLabel>
            <OutlinedInput
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              label={t("arf", {
                slug: t("slugs.description"),
              })}
              multiline
              rows={5}
            />
            {touched.description && errors.description && (
              <FormHelperText>{errors.description}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        {values.cooling_time !== -1 && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl
              fullWidth
              error={Boolean(touched.cooling_time && errors.cooling_time)}
            >
              <InputLabel htmlFor="cooling_time">
                {t("createExc.cooling_time")}
              </InputLabel>
              <OutlinedInput
                id="cooling_time"
                name="cooling_time"
                value={values.cooling_time}
                onChange={handleChange}
                onBlur={handleBlur}
                label={t("createExc.cooling_time")}
                type="number"
              />
              {touched.cooling_time && errors.cooling_time && (
                <FormHelperText>{errors.cooling_time}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        )}

        <Grid size={{ xs: 12, sm: 6 }} alignSelf={"center"}>
          <FormControlLabel
            control={<Checkbox defaultChecked={values.cooling_time === -1} />}
            onChange={(e, ch) => {
              setFieldValue("cooling_time", ch ? -1 : 0);
            }}
            label={t("createExc.cooling_as")}
            sx={{
              border: "1px solid #f1f1f1",
              width: "100%",
              borderRadius: "10px",
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Autocomplete
            multiple
            id="notes"
            options={[]}
            defaultValue={values.notes}
            onChange={(e, newVlaue) => {
              setFieldValue("notes", newVlaue);
            }}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) => {
              return value?.map((option: string, index: number) => {
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
                label={t("createExc.notes")}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Autocomplete
            multiple
            id="notes_ar"
            options={[]}
            defaultValue={values.notes_ar || []}
            onChange={(e, newVlaue) => {
              setFieldValue("notes_ar", newVlaue);
            }}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) => {
              return value?.map((option: string, index: number) => {
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
                label={t("arf", {
                  slug: t("slugs.notes"),
                })}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={1}>
            <Grid size={12}>{values.images && exerciseImg}</Grid>
            <Grid size={"grow"} sx={{ transition: "width 0.3s" }}>
              <FileImagePicker
                title={t("imagePicker.title", { slug: t("slugs.exc") })}
                onSelectImage={(files) => {
                  if (files !== null && files?.length > 0) {
                    setFieldValue("images", [...values.images, files[0]]);
                  }
                }}
                name="images"
                accept="image/png,image/jpg,image/jpeg"
                id="images"
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
          </Grid>
          {touched.images && errors.images && (
            <FormHelperText error>{errors.images}</FormHelperText>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={1}>
            <Grid size={"grow"} sx={{ transition: "width 0.3s" }}>
              <FileImagePicker
                title={t("imagePicker.title", { slug: t("slugs.target_mus") })}
                onSelectImage={(files) => {
                  if (files !== null) {
                    setFieldValue("target_muscles_image", files[0]);
                  }
                }}
                accept="image/png,image/jpg,image/jpeg"
                name="target_muscles_image"
                id="target_muscles_image"
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
            <Grid size={"auto"}>{targetImage}</Grid>
          </Grid>
          {touched.target_muscles_image && errors.target_muscles_image && (
            <FormHelperText error>{errors.target_muscles_image}</FormHelperText>
          )}
        </Grid>
        <Grid size={12}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FileImagePicker
                containerProps={{
                  sx: {
                    height: "100%",
                  },
                }}
                title={t("vidPicker.title", { slug: t("slugs.exc") })}
                onSelectImage={(files) => {
                  setFieldValue("video", files?.[0]);
                }}
                accept="video/*"
                name="video"
                id="video"
                onBlur={handleBlur}
                renderContent={() => {
                  return (
                    <Box sx={{ mt: 2 }}>
                      <Typography textAlign={"center"} color="primary.main">
                        {t("vidPicker.types")}
                      </Typography>
                    </Box>
                  );
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              {values.video && exerciseVideo}
            </Grid>
          </Grid>
          {touched.video && errors.video && (
            <FormHelperText error>{errors.video}</FormHelperText>
          )}
        </Grid>
      </Grid>
      <Box my={2}>
        <LoadingButton
          type="submit"
          sx={{ width: { xs: "100%", sm: "fit-content" } }}
          variant="contained"
          color="primary"
          {...loadingButtonProps}
        >
          {t("gbtn." + task)}
        </LoadingButton>
        {loadingButtonProps?.loading && (
          <Typography>
            {t("createExc.waitting")} <b>{progress}%</b>
          </Typography>
        )}
      </Box>
    </form>
  );
};

export default ExerciseForm;
