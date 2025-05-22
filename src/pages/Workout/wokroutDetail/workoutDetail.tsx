import { alpha, Box, Chip, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { Grid } from "@mui/material";
import { gridSpacing } from "../../../config";
import { WorkoutDetail } from "../../../tables-def/workout";
import MainCard from "../../../components/MainCard";
import DeleteTypography from "../../../components/DeleteTypography";
import {
  areEqual,
  FixedSizeList as List,
  ListChildComponentProps,
} from "react-window";
import ExcerciseCard from "../../Exercise/components/ExcerciseCard";
import memoize from "memoize-one";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../../utils/useGetTranslation";

const Exercise: React.FC<ListChildComponentProps> = memo(
  ({ index, style, data }) => (
    <div style={{ ...style, width: "300px" }} key={index}>
      <ExcerciseCard
        noActions={!data.withAction}
        exercise={data.exercises[index]}
      />
    </div>
  ),
  areEqual
);

const createItemData = memoize((items) => ({
  items,
}));

const WorkOutDetailPage = ({
  withAction = true,
  workout,
}: {
  withAction?: boolean;
  workout: WorkoutDetail;
}) => {
  const exercises = createItemData(workout.exercises);
  const { t, i18n } = useTranslation();
  const { getTranslation2 } = useGetTranslation();
  return (
    <Box>
      <Grid container spacing={gridSpacing}>
        <Grid size={12}>
          <MainCard cardContent={false} sx={{ p: 2.5 }}>
            <Stack
              flexDirection={{ sm: "row" }}
              justifyContent={"space-between"}
              alignItems={{ sm: "center" }}
              gap={2}
            >
              <Box flex={2}>
                <Typography mb={1} variant="h3">
                  {getTranslation2(workout, "title")}
                </Typography>
                <Typography variant="h5" mb={1}>
                  {getTranslation2(workout, "description")}
                </Typography>
              </Box>
              <Box flex={1}>
                <Chip
                  color={workout.type === "group" ? "primary" : "secondary"}
                  label={t("global." + workout.type)}
                  sx={{ borderRadius: "4px", mb: 1 }}
                />
                <Typography
                  sx={{
                    fontWeight: "600",
                    textTransform: "capitalize",
                    fontStyle: "italic",
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  {t("workoutDetail.level")} : {workout.difficulty_level}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                    textTransform: "capitalize",
                    fontStyle: "italic",
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  {t("workoutDetail.duration")} : {workout.duration}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                    textTransform: "capitalize",
                    fontStyle: "italic",
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  {t("workoutDetail.created_at")} : {workout.createdAt}
                </Typography>
              </Box>
            </Stack>
          </MainCard>
        </Grid>
        <Grid size={12}>
          <DeleteTypography
            sx={{
              borderLeftColor: (theme) =>
                alpha(theme.palette.secondary.main, 0.3),
              my: 2,
            }}
          >
            {t("workoutDetail.workoutExcer")}
          </DeleteTypography>
          <Grid container spacing={gridSpacing} alignItems={"stretch"}>
            <List
              itemCount={workout.exercises.length}
              itemSize={310}
              height={400}
              direction={i18n.language === "ar" ? "rtl" : "ltr"}
              width={1000}
              itemData={{ exercises: exercises.items, withAction }}
              layout="horizontal"
              style={{
                width: "100%",
              }}
            >
              {Exercise}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkOutDetailPage;
