import {
  Box,
  CardHeader,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { gridSpacing } from "../../../config";
import MainCard from "../../../components/MainCard";
import ReactPlayer from "react-player";
import { Grid } from "@mui/material";
import { Exercise } from "../../../tables-def/excercise";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../../utils/useGetTranslation";

const DetailPanel = ({ exercise }: { exercise: Exercise }) => {
  const { t } = useTranslation();
  const { getTranslation, getTranslation2 } = useGetTranslation();
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
                  {getTranslation2(exercise, "name")}
                </Typography>
                <Typography variant="h5" mb={1}>
                  {getTranslation2(exercise, "description")}
                </Typography>
                <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
                  {exercise[
                    getTranslation("notes") as "notes" | "notes_ar"
                  ]?.map((note, i) => {
                    return <Chip key={i} label={note} />;
                  })}
                </Stack>
              </Box>
            </Stack>
          </MainCard>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={gridSpacing}>
            <Grid size={{ xs: 12, md: 6 }}>
              <MainCard sx={{ width: "100%", p: 0 }} cardContent={false}>
                <CardHeader title={t("excDetail.detailPanel.exc_image")} />
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={2}
                  sx={{
                    overflowX: "auto",
                  }}
                >
                  {exercise.image_urls?.map((image) => (
                    <CardMedia
                      component={"img"}
                      height={"auto"}
                      sx={{
                        maxHeight: "300px",
                        objectFit: "contain",
                      }}
                      alt={exercise.name}
                      image={image}
                    />
                  ))}
                </Stack>
              </MainCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <MainCard sx={{ width: "100%", p: 0 }} cardContent={false}>
                <CardHeader title={t("excDetail.detailPanel.tar_mus_image")} />
                <CardMedia
                  component={"img"}
                  height={"auto"}
                  sx={{
                    maxHeight: "300px",
                    objectFit: "contain",
                  }}
                  alt={exercise.name}
                  image={exercise.target_muscles_image}
                />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <MainCard>
            <Box sx={{ borderRadius: "10px", overflow: "hidden" }}>
              <ReactPlayer
                url={exercise.video_url}
                width={"100%"}
                height={400}
                controls
              />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailPanel;
