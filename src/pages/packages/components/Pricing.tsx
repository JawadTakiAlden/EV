import { alpha, Box } from "@mui/material";
import PricingForm from "./PricingForm";
import { Grid } from "@mui/material";
import { gridSpacing } from "../../../config";
import {
  Pricing as PriceModel,
  PricingColumns,
} from "../../../tables-def/packages";
import DeleteTypography from "../../../components/DeleteTypography";
import { useCreatePrice } from "../../../api/packages";
import { useParams } from "react-router";
import Loadable from "../../../components/Loadable";
import { lazy } from "react";
import { useTranslation } from "react-i18next";

const Table = Loadable(lazy(() => import("../../../components/Table")));

const Pricing = ({
  withActions = true,
  pricing,
  isLoading = false,
}: {
  withActions?: boolean;
  pricing: PriceModel[];
  isLoading?: boolean;
}) => {
  const createPrice = useCreatePrice();
  const { packageId } = useParams();
  const { t } = useTranslation();
  return (
    <Box>
      <Grid container spacing={gridSpacing}>
        {withActions && (
          <Grid size={12}>
            <DeleteTypography
              sx={{
                borderLeftColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.4),
                mb: 2,
              }}
            >
              {t("pricing.title")}
            </DeleteTypography>
            <PricingForm
              task="create"
              dir="row"
              initialValues={{
                title: "",
                title_ar: "",
                price: 0,
                number_of_days: 0,
                package_id: packageId!,
              }}
              ButtonProps={{
                loading: createPrice.isPending,
              }}
              onSubmit={(values: any) => {
                createPrice.mutate(values);
              }}
            />
          </Grid>
        )}
        <Grid size={12}>
          <Table
            enablePagination={false}
            renderBottomToolbar={false}
            data={pricing || []}
            state={{
              isLoading: isLoading,
            }}
            columns={PricingColumns(withActions)}
            enableRowActions={false}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pricing;
