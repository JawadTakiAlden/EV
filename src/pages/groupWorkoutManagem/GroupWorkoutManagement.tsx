import { Box, Stack, Typography } from "@mui/material";
import { gridSpacing } from "../../config";
import Grid from "@mui/material/Grid2";
import { Package } from "../../tables-def/packages";
import MiniPackageCard from "./MiniPackageCard";
import WorkoutManagement from "../../components/WorkoutManagement/WorkoutManagement";
import { useState } from "react";
import {
  useGetPackages,
  useGetWorkoutOfPackageAndDay,
} from "../../api/packages";
import LoadingDataError from "../../components/LoadingDataError";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GroupWorkoutManagement = () => {
  const [selectedPackage, setSelectedPackage] = useState<null | Package>(null);
  const packagesQuery = useGetPackages();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const workoutsQuery = useGetWorkoutOfPackageAndDay(
    selectedPackage?.id,
    searchParams.get("day")!
  );

  if (packagesQuery.isLoading) {
    return <Typography>{t("global.loading")} ...</Typography>;
  }

  if (packagesQuery.isError) {
    return <LoadingDataError refetch={packagesQuery.refetch} />;
  }

  const packages = packagesQuery?.data?.data;

  return (
    <Box>
      <Grid container spacing={gridSpacing}>
        <Grid size={12}>
          <Box
            sx={{
              maxWidth: "100%",
              overflowX: "auto",
              pb: 1,
            }}
          >
            <Stack
              flexDirection={"row"}
              gap={2}
              alignItems={"flex-start"}
              sx={{ minwidth: "800px" }}
            >
              {packages?.map((pac, i) => (
                <Box
                  key={i}
                  className={
                    selectedPackage?.id === pac.id ? "package-selected" : ""
                  }
                  sx={{
                    "&.package-selected": {
                      borderTop: (theme) =>
                        `3px solid ${theme.palette.primary.main}`,
                    },
                    flexShrink: 0,
                    borderRadius: "10px",
                    overflow: "hidden",
                    width: "200px",
                  }}
                >
                  <Box
                    onClick={() => {
                      setSelectedPackage(pac);
                    }}
                  >
                    <MiniPackageCard packageRow={pac} />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>
        <Grid size={12}>
          {workoutsQuery.isError ? (
            <LoadingDataError refetch={workoutsQuery.refetch} />
          ) : (
            <WorkoutManagement
              isLoading={workoutsQuery.isLoading || workoutsQuery.isRefetching}
              type="group"
              targetPackage={{
                id: selectedPackage?.id!,
                name: selectedPackage?.name!,
              }}
              data={workoutsQuery.data?.data?.[0] || {}}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default GroupWorkoutManagement;
