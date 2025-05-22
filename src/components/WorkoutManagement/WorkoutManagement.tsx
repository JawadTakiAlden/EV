import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import { gridSpacing } from "../../config";
import { Box, Button, ListItemButton, Stack, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import WorkoutCard from "../../pages/Workout/components/WorkoutCard";
import { useGetDaysOfMonth } from "../../api/days-of-month";
import { useTranslation } from "react-i18next";

const WorkoutManagement = ({
  type,
  user,
  targetPackage,
  data,
  isLoading = false,
}: {
  type: "group" | "personalized";
  isLoading?: boolean;
  user?: {
    id: number;
    name: string;
  };
  targetPackage: {
    id: number;
    name: string;
  };
  data: any;
}) => {
  const daysContainerRef = useRef<HTMLDivElement>(null);
  const [activeDay, setActiveDay] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const day = searchParams.get("day") as string;
  const { base } = useAuthContext();
  const { t } = useTranslation();

  const dates = useGetDaysOfMonth();

  useEffect(() => {
    setActiveDay(day);
  }, [day]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid size={12}>
        <Box
          ref={daysContainerRef}
          sx={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          <Stack flexWrap={"wrap"} flexDirection={"row"} gap={2}>
            {dates?.data?.data?.dates?.map(({ day, date }, i) => (
              <ListItemButton
                selected={date === activeDay}
                sx={{
                  justifyContent: "center",
                  width: "100px",
                  textWrap: "nowrap",
                  textAlign: "center",
                }}
                onClick={() => {
                  searchParams.set("day", date);
                  setSearchParams(searchParams);
                }}
                key={i}
              >
                {day}
                <br />
                {date}
              </ListItemButton>
            ))}
          </Stack>
        </Box>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={12}>
            <Button
              disabled={!day || !targetPackage.id}
              onClick={() => {
                navigate(
                  `/${base}/dashboard/workout/create?day=${activeDay}&package_id=${targetPackage.id!}&package_name=${
                    targetPackage?.name
                  }&type=${type}${
                    type === "personalized"
                      ? `&user_id=${user?.id}&user_name=${user?.name}`
                      : ""
                  }`
                );
              }}
              variant="contained"
            >
              {t("workout_man.add")}
            </Button>
          </Grid>
          <Grid size={12}>
            {isLoading ? (
              <Typography textAlign={"center"}>
                {" "}
                {t("global.loading")} ...
              </Typography>
            ) : Object.keys(data).length !== 0 ? (
              <WorkoutCard workout={data} />
            ) : (
              <Typography> {t("workout_man.nodata")}</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WorkoutManagement;
