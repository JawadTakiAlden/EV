import { alpha, Box, Typography } from "@mui/material";
import React from "react";
import { Grid } from "@mui/material";
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
import CouponForm from "../coupons/components/CouponForm";
import { useCreateGlobalCoupons } from "../../api/coupons";
import dayjs from "dayjs";
import * as yup from "yup";
import { useParams } from "react-router";

const MealPlanDetail = () => {
  const deleteMealPlan = useDeleteMealPlan();
  const meal = useShowMealPlan();
  const updateMealPlan = useUpdateMealPlan();
  const createCoupon = useCreateGlobalCoupons();
  const { mealPlanId } = useParams();

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
            ButtonProps={{
              loading: updateMealPlan.isPending,
            }}
            initialValues={meal.data?.data!}
          />
        </Grid>
        <Grid size={12}>
          <DeleteTypography
            sx={{
              borderLeftColor: (theme) => alpha(theme.palette.info.main, 0.3),
              mb: 2,
            }}
          >
            {t("updateMealPlan.createCopuon")}
          </DeleteTypography>
          <CouponForm
            initialValues={{
              code: "",
              discount_type: "percentage",
              discount_value: 0,
              expiry_date: dayjs(),
              is_active: true,
              usage_limit: 100,
              meal_plan_id: mealPlanId,
            }}
            ButtonProps={{
              loading: createCoupon.isPending,
            }}
            onSubmit={(values) => {
              createCoupon.mutate({
                ...values,
                expiry_date: values.expiry_date.format("DD-MM-YYYY"),
              });
            }}
            validationSchema={validationSchema}
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

const validationSchema = yup.object().shape({
  code: yup.string().required().label("val.code"),
  discount_value: yup
    .number()
    .moreThan(0)
    .required()
    .label("val.discount_value"),
  usage_limit: yup.number().moreThan(0).required().label("val.usage_limit"),
});

export default MealPlanDetail;
