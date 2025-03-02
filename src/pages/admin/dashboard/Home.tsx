import { lazy } from "react";
import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../../config";
import StatisticCard from "../../../components/StatisticCard";
import Loadable from "../../../components/Loadable";
import { useGetStats } from "../../../api/admin/stats";
import Notification from "../notification/notification";
import { useTranslation } from "react-i18next";

const SigninStatstics = Loadable(lazy(() => import("./SigninStatstics")));

const Home = () => {
  const stats = useGetStats();
  const { t } = useTranslation();

  return (
    <Grid container direction={"column"} spacing={gridSpacing}>
      {/* First Row */}
      <Grid container>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <StatisticCard
            count={`${stats?.data?.data?.metrics?.activeFitnessSubscriptions}`}
            isLoss={false}
            percentage={20}
            loading={stats.isLoading}
            title={t("home.active_fit_sub")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <StatisticCard
            count={`${stats?.data?.data?.metrics?.activeMealSubscriptions}`}
            isLoss={false}
            percentage={20}
            loading={stats.isLoading}
            title={t("home.active_meal_sub")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <StatisticCard
            count={`${stats?.data?.data?.metrics?.newSignupsCount}`}
            isLoss={false}
            percentage={20}
            loading={stats.isLoading}
            title={t("home.new_sing")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <StatisticCard
            count={`${stats?.data?.data?.metrics?.workoutCompletionRate}`}
            isLoss
            percentage={20}
            loading={stats.isLoading}
            title={t("home.completion_rate")}
          />
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container>
        <Grid size={{ xs: 12, sm: 7, md: 8 }}>
          <SigninStatstics />
        </Grid>
        <Grid size={{ xs: 12, sm: 5, md: 4 }}>
          <Notification />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
