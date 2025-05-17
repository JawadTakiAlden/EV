import React from "react";
import MainCard from "./MainCard";
import { alpha, Chip, Icon, Skeleton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AiOutlineFall } from "react-icons/ai";
import { AiOutlineRise } from "react-icons/ai";

interface StatsticCardProps {
  title: string;
  count: string;
  loading?: boolean;
}

const StatisticCard = ({
  title,
  count,
  loading = false,
}: StatsticCardProps) => {
  return (
    <MainCard
      contentProps={{
        sx: {
          p: 2.25,
        },
      }}
    >
      <Stack spacing={0.5}>
        {loading ? (
          <Skeleton variant="text" width={"100%"} height={"60px"} />
        ) : (
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        )}

        <Grid container alignItems="center">
          <Grid size={"auto"}>
            {loading ? (
              <Skeleton variant="text" width={"100px"} height={"50px"} />
            ) : (
              <Typography variant="h4" color="inherit">
                {count}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Stack>
    </MainCard>
  );
};

export default StatisticCard;
