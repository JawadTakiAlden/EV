import { alpha, Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../../config";
import DeleteTypography from "../../../components/DeleteTypography";
import CreateSurvey from "../../Survey/createSurvey/createSurvey";
import SurveyCard from "./SurveyCard";
import { useGetSurveys } from "../../../api/surveys";
import MainCard from "../../../components/MainCard";
import LoadingDataError from "../../../components/LoadingDataError";
import { useTranslation } from "react-i18next";

const Survey = ({ withActions = true }: { withActions?: boolean }) => {
  const surveysdata = useGetSurveys();

  const { t } = useTranslation();

  if (surveysdata.isLoading) {
    return (
      <MainCard border={false}>
        <Skeleton height={350} animation={"wave"} width={250} />
      </MainCard>
    );
  }

  if (surveysdata.isError) {
    return <LoadingDataError refetch={surveysdata.refetch} />;
  }

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
              {t("survey.title")}
            </DeleteTypography>
            <CreateSurvey />
          </Grid>
        )}
        {surveysdata.data?.data?.length === 0 && (
          <Typography>
            {t("nodata", {
              slug: t("slugs.survey"),
            })}
          </Typography>
        )}
        <Grid size={12}>
          <Stack flexDirection={"row"} flexWrap={"wrap"} gap={2}>
            {surveysdata.data?.data?.map((survey, i) => (
              <SurveyCard withActions={withActions} key={i} survey={survey} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Survey;
