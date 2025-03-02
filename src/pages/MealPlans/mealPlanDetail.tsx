import { alpha, Box, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../config";
import DeleteTypography from "../../components/DeleteTypography";
import MealPlanForm from "./components/MealPlanForm";
import DoupleClickToConfirm from "../../components/DoupleClickToConfirm";
import {
  useDeleteMealPlan,
  useShowMealPlan,
  useUpdateMealPlan,
} from "../../api/mealPlan";
import LoadingDataError from "../../components/LoadingDataError";
import { useTranslation } from "react-i18next";

const MealPlanDetail = () => {
  const deleteMealPlan = useDeleteMealPlan();
  const meal = useShowMealPlan();
  const updateMealPlan = useUpdateMealPlan();

  const { t } = useTranslation();

  if (meal.isLoading) {
    return <Typography>{t("global.loading")} ...</Typography>;
  }

  if (meal.isError) {
    return <LoadingDataError refetch={meal.refetch} />;
  }

  return (
    <Box>
      <Grid container spacing={gridSpacing}>
        <Grid size={12}>
          <DeleteTypography
            sx={{
              borderLeftColor: (theme) => alpha(theme.palette.info.main, 0.3),
              mb: 2,
            }}
          >
            {t("updateMealPlan.title")}
          </DeleteTypography>
          <MealPlanForm
            task="update"
            onSubmit={(values) => {
              updateMealPlan.mutate({
                ...values,
                types: values.types.map((type) => type.id),
              });
            }}
            loadingButtonProps={{
              loading: updateMealPlan.isPending,
            }}
            initialValues={meal.data?.data!}
          />
        </Grid>
        <Grid size={12}>
          <Box>
            <DeleteTypography mb={2}>
              {t("deleteSec.button", {
                slug: t("slugs.meal_plan"),
              })}
            </DeleteTypography>
            <Typography sx={{ maxWidth: "1000px", mb: 2 }}>
              {t("deleteSec.warning")}
            </Typography>
            <DoupleClickToConfirm
              onClick={() => {
                deleteMealPlan.mutate();
              }}
              loading={deleteMealPlan.isPending}
              color="error"
            >
              {t("gbtn.delete")}
            </DoupleClickToConfirm>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MealPlanDetail;
