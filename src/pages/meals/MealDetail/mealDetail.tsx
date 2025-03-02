import React from "react";
import {
  alpha,
  Box,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../../config";
import DeleteTypography from "../../../components/DeleteTypography";
import DoupleClickToConfirm from "../../../components/DoupleClickToConfirm";
import MealForm from "../components/MealForm";
import { useDeleteMeal, useShowMeal, useUpdateMeal } from "../../../api/meals";
import LoadingDataError from "../../../components/LoadingDataError";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../../utils/useGetTranslation";

const MealDetail = () => {
  const meal = useShowMeal();
  const deleteMeal = useDeleteMeal();
  const updateMeal = useUpdateMeal();
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();
  if (meal.isError) {
    return <LoadingDataError refetch={meal.refetch} />;
  }

  return (
    <Box>
      <Grid container spacing={gridSpacing}>
        <Grid size={12}>
          <Stack
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={"center"}
            gap={2}
          >
            <Box
              sx={{
                width: "calc(50px + 5vw)",
                height: "calc(50px + 5vw)",
                borderRadius: "50%",
                boxShadow: (theme) =>
                  `10px 0 0 ${theme.palette.background.paper}`,
                overflow: "hidden",
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.1),
              }}
            >
              {meal.isLoading && (
                <Skeleton
                  width={"100%"}
                  height={"100%"}
                  variant="rectangular"
                />
              )}
              {!meal.isLoading && (
                <img
                  src={meal.data?.data.image_url}
                  alt={meal.data?.data.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" mb={2}>
                {meal.isLoading ? (
                  <Skeleton width={100} height={20} />
                ) : (
                  getTranslation2(meal.data?.data, "name")
                )}
              </Typography>
              <Typography variant="body1" mb={2}>
                {meal.isLoading ? (
                  <Skeleton width={150} height={20} />
                ) : (
                  getTranslation2(meal.data?.data, "description")
                )}
              </Typography>
              <Typography variant="caption">
                {meal.isLoading ? (
                  <Skeleton width={70} height={20} />
                ) : (
                  meal.data?.data.calories
                )}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid size={12}>
          <Divider />
        </Grid>
        <Grid size={12}>
          <DeleteTypography
            sx={{
              borderLeftColor: (theme) => alpha(theme.palette.info.main, 0.2),
              mb: 2,
            }}
          >
            {t("mealDetail.update")}
          </DeleteTypography>
          {!meal.isLoading && !meal.isError && (
            <MealForm
              task="update"
              loadingButtonProps={{
                loading: updateMeal.isPending,
              }}
              onSubmit={(values) => {
                const mutatedValues = {
                  ...values,
                  types: values.types.map((ty) => ty.id),
                  ingredients: values.ingredients.map((ty) => ty.id),
                };
                const mealFormData = new FormData();
                mealFormData.append("name", mutatedValues.name);
                mealFormData.append("description", mutatedValues.description);
                mealFormData.append("name_ar", mutatedValues.name_ar);
                mealFormData.append(
                  "description_ar",
                  mutatedValues.description_ar
                );
                mealFormData.append("carb", values.carb.toString());
                mutatedValues.ingredients.map((ingre, i) =>
                  mealFormData.append(`ingredients[${i}]`, ingre.toString())
                );
                mutatedValues.types.map((type, i) =>
                  mealFormData.append(`types[${i}]`, type.toString())
                );
                mealFormData.append(
                  "calories",
                  mutatedValues.calories.toString()
                );
                mealFormData.append("fats", mutatedValues.fats.toString());
                mealFormData.append("fiber", mutatedValues.fiber.toString());
                mealFormData.append(
                  "protein",
                  mutatedValues.protein.toString()
                );
                mutatedValues.images.map((image) =>
                  mealFormData.append("images", image)
                );
                updateMeal.mutate(mealFormData);
              }}
              initialValues={{
                ...meal?.data?.data,
              }}
            />
          )}
        </Grid>

        <Grid size={12}>
          <Divider />
        </Grid>
        <Grid size={12}>
          <Box>
            <DeleteTypography mb={2}>
              {t("deleteSec.button", { slug: t("slugs.meal") })}
            </DeleteTypography>
            <Typography sx={{ maxWidth: "1000px", mb: 2 }}>
              {t("deleteSec.warning")}
            </Typography>
            <DoupleClickToConfirm
              color="error"
              loading={deleteMeal.isPending}
              onClick={() => {
                deleteMeal.mutate();
              }}
            >
              {t("gbtn.delete")}
            </DoupleClickToConfirm>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MealDetail;
