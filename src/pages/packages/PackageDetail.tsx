import { Box, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../config";
import PackageForm from "./components/packageForm";
import Pricing from "./components/Pricing";
import Survey from "./components/Survey";
import {
  useDeletePackage,
  useShowPackage,
  useUpdatePackage,
} from "../../api/packages";
import DeleteTypography from "../../components/DeleteTypography";
import DoupleClickToConfirm from "../../components/DoupleClickToConfirm";
import { useTranslation } from "react-i18next";
const PackageDetail = ({ withActions = true }: { withActions?: boolean }) => {
  const packageInfo = useShowPackage();
  const deletePackage = useDeletePackage();
  const updatePackage = useUpdatePackage();
  const { t } = useTranslation();
  return (
    <Box>
      <Grid container spacing={gridSpacing}>
        {withActions && (
          <Grid size={12}>
            {!packageInfo.isLoading && !packageInfo.isError && (
              <PackageForm
                task="update"
                initialValues={packageInfo.data?.data}
                loadingButtonProps={{
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
      </Grid>
    </Box>
  );
};

export default PackageDetail;
