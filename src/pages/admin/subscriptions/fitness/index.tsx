import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../../../config";
import MainCard from "../../../../components/MainCard";
import SectionTitle from "../../../../components/SectionTitle";
import FitnessSubscriptionTable from "./FitnessSubscriptionTable";
import { lazy } from "react";
import Loadable from "../../../../components/Loadable";
import { useTranslation } from "react-i18next";

const FitnessSubscriptionsBarAnalysis = Loadable(
  lazy(() => import("./FitnessSubscriptionsBarAnalysis"))
);
const FitnessSubscriptionsLineAnalysis = Loadable(
  lazy(() => import("./FitnessSubscriptionsLineAnalysis"))
);

const FitnessSubscriptions = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <FitnessSubscriptionTable />
      <Grid
        alignItems={"stretch"}
        sx={{ mt: 2 }}
        container
        spacing={gridSpacing}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <MainCard>
            <SectionTitle sx={{ color: "text.primary" }}>
              {t("fitnessSubscriptions.title")}
            </SectionTitle>
            <FitnessSubscriptionsBarAnalysis />
          </MainCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MainCard>
            <SectionTitle sx={{ color: "text.primary" }}>
              {t("fitnessSubscriptions.renewal")}
            </SectionTitle>
            <FitnessSubscriptionsLineAnalysis />
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FitnessSubscriptions;
