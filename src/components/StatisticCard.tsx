import React from "react";
import MainCard from "./MainCard";
import { alpha, Chip, Icon, Skeleton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AiOutlineFall } from "react-icons/ai";
import { AiOutlineRise } from "react-icons/ai";

interface StatsticCardProps {
  title: string;
  count: string;
  percentage: number;
  loading?: boolean;
  color?: "warning" | "info";
  isLoss: boolean;
}

const StatisticCard = ({
  title,
  count,
  percentage,
  loading = false,
  isLoss,
  color,
}: StatsticCardProps) => {
  if (!color) {
    color = isLoss ? "warning" : "info";
  }
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
          {percentage && (
            <Grid>
              <Chip
                icon={
                  loading ? (
                    <Skeleton
                      width={"30px"}
                      height={"100%"}
                      variant="rectangular"
                    />
                  ) : isLoss ? (
                    <Icon>
                      <AiOutlineFall />
                    </Icon>
                  ) : (
                    <Icon>
                      <AiOutlineRise />
                    </Icon>
                  )
                }
                label={loading ? "" : `${percentage}%`}
                sx={{
                  ml: 1.25,
                  pl: 1,
                  borderRadius: "4px",
                  background: (theme) => alpha(theme.palette[color!].main, 0.2),
                }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
    </MainCard>
  );
};

export default StatisticCard;
