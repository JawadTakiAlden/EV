import React from "react";
import { gridSpacing } from "../../../config";
import Grid from "@mui/material/Grid2";
import StatisticCard from "../../../components/StatisticCard";
import { useGetStats } from "../../../api/admin/stats";
import Screen from "../../../components/Screen";
const Home = () => {
  const stats = useGetStats();
  return (
    <Screen title="Coach Panel - Home">
      <Grid container direction={"column"} spacing={gridSpacing}>
        {/* First Row */}
        <Grid container>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <StatisticCard
              count={`${stats?.data?.data?.metrics?.activeFitnessSubscriptions}`}
              loading={stats.isLoading}
              title="Active fitness subscription"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <StatisticCard
              count={`${stats?.data?.data?.metrics?.activeMealSubscriptions}`}
              loading={stats.isLoading}
              title="Active meal subscription"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <StatisticCard
              count={`${stats?.data?.data?.metrics?.newSignupsCount}`}
              loading={stats.isLoading}
              title="New sign ups"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <StatisticCard
              count={`${stats?.data?.data?.metrics?.workoutCompletionRate}`}
              loading={stats.isLoading}
              title="Workout completion rate"
            />
          </Grid>
        </Grid>
      </Grid>
    </Screen>
  );
};

export default Home;
