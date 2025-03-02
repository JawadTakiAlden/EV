import { alpha, Box } from "@mui/material";
import React from "react";
import DeleteTypography from "../../../components/DeleteTypography";
import MealPlanForm from "../components/MealPlanForm";
import { useCreateMealPlan } from "../../../api/mealPlan";
import { useTranslation } from "react-i18next";

const CreateMealPlan = () => {
  const createMealPlan = useCreateMealPlan();
  const { t } = useTranslation();
  return (
    <Box>
      <DeleteTypography
        sx={{
          borderLeftColor: (theme) => alpha(theme.palette.info.main, 0.3),
          mb: 2,
        }}
      >
        {t("createMealPlan.title")}
      </DeleteTypography>
      <MealPlanForm
        onSubmit={(values) => {
          createMealPlan.mutateAsync({
            ...values,
            types: values.types.map((ty) => ty.id),
          });
        }}
        loadingButtonProps={{
          loading: createMealPlan.isPending,
        }}
        initialValues={{
          title: "",
          title_ar: "",
          calories: 0,
          image: null,
          types: [],
          price_monthly: undefined,
        }}
      />
    </Box>
  );
};

export default CreateMealPlan;
