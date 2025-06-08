import { Box, Typography } from "@mui/material";
import React from "react";
import { Grid } from "@mui/material";
import { gridSpacing } from "../../config";
import PackageForm from "./components/packageForm";
import Pricing from "./components/Pricing";
import Survey from "./components/Survey";
import * as yup from "yup";
import {
  useDeletePackage,
  useShowPackage,
  useUpdatePackage,
} from "../../api/packages";
import DeleteTypography from "../../components/DeleteTypography";
import DoupleClickToConfirm from "../../components/DoupleClickToConfirm";
import { useTranslation } from "react-i18next";
import CouponForm from "../coupons/components/CouponForm";
import dayjs from "dayjs";
import { useCreateGlobalCoupons } from "../../api/coupons";
import { useParams } from "react-router";
const PackageDetail = ({ withActions = true }: { withActions?: boolean }) => {
  const packageInfo = useShowPackage();
  const deletePackage = useDeletePackage();
  const updatePackage = useUpdatePackage();
  const { t } = useTranslation();
  const createCoupon = useCreateGlobalCoupons();
  const { packageId } = useParams();
  return (
    <Box>
      <Grid container spacing={gridSpacing}>
        {withActions && (
          <Grid size={12}>
            {!packageInfo.isLoading && !packageInfo.isError && (
              <PackageForm
                task="update"
                initialValues={packageInfo.data?.data}
                ButtonProps={{
                  loading: updatePackage.isPending,
                }}
                onSubmit={(values) => {
                  updatePackage.mutate(values);
                }}
              />
            )}
          </Grid>
        )}

        <Grid size={12}>
          <Pricing
            isLoading={packageInfo.isLoading}
            withActions={withActions}
            pricing={packageInfo.data?.data.pricings}
          />
        </Grid>
        <Grid size={12}>
          <DeleteTypography
            sx={{
              borderLeftColor: (theme) => theme.palette.info.main,
            }}
          >
            {t("packageDetail.coupon")}
          </DeleteTypography>
          <CouponForm
            initialValues={{
              code: "",
              discount_type: "percentage",
              discount_value: 0,
              expiry_date: dayjs(),
              is_active: true,
              usage_limit: 100,
              package_id: packageId,
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
      </Grid>
      <Grid size={12}>
        <Survey withActions={withActions} />
      </Grid>
      <Grid>
        <DeleteTypography mb={1}>
          {t("deleteSec.button", {
            slug: t("slugs.package"),
          })}
        </DeleteTypography>
        <Typography mb={1}>{t("deleteSec.warning")}</Typography>
        <DoupleClickToConfirm
          loading={deletePackage.isPending}
          color="error"
          onClick={() => {
            deletePackage.mutate();
          }}
        >
          {t("gbtn.delete")}
        </DoupleClickToConfirm>
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

export default PackageDetail;
