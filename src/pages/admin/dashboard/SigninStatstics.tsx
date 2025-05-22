import React from "react";
import { Grid } from "@mui/material";
import { Box, Typography, useTheme } from "@mui/material";
import MainCard from "../../../components/MainCard";
import AreaChart from "../../../components/charts/AreaChart";
import { useGetNewSignups } from "../../../api/admin/stats";
import { useTranslation } from "react-i18next";

const SigninStatstics = () => {
  const theme = useTheme();
  const newSignups = useGetNewSignups();
  const { t } = useTranslation();

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid size={8}>
          <Typography variant="h5">{t("home.new_sing")}</Typography>
        </Grid>
      </Grid>
      <MainCard cardContent={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <AreaChart
            series={[
              {
                name: "Sign-Ups",
                data: newSignups?.data?.data?.map((row) => row.signups) || [],
              },
            ]}
            options={{
              tooltip: {
                theme: theme.palette.mode,
              },
              colors:
                theme.palette.mode === "dark"
                  ? [theme.palette.grey[700]]
                  : [theme.palette.primary.main, theme.palette.secondary.main],
              xaxis: {
                categories:
                  newSignups?.data?.data?.map((row) => row.month) || [],
                labels: {
                  style: {
                    colors: Array(12).fill(theme.palette.text.primary),
                  },
                },

                axisBorder: {
                  show: true,
                  color: theme.palette.divider,
                },
              },
              yaxis: {
                labels: {
                  style: {
                    colors: [theme.palette.text.primary],
                  },
                },
              },
              grid: {
                borderColor: theme.palette.divider,
              },
            }}
          />
        </Box>
      </MainCard>
    </>
  );
};

export default SigninStatstics;
