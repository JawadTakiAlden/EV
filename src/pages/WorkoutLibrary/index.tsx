import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  CardActions,
  CardActionArea,
  Button,
} from "@mui/material";
import { useGetWorkoutTemplate } from "../../api/templates";
import useGetTranslation from "../../utils/useGetTranslation";

import Grid from "@mui/material/Grid2";
import { gridSpacing } from "../../config";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import { WorkoutModel } from "../../tables-def/workout";

export const WorkoutTemplateCard = ({
  workout,
  row = false,
  withAction = true,
}: {
  workout: WorkoutModel;
  row?: boolean;
  withAction?: boolean;
}) => {
  const { getTranslation2 } = useGetTranslation();
  const { t } = useTranslation();
  const { base } = useAuthContext();
  return (
    <Box sx={{ height: "100%" }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: row ? "row" : "column",
          alignItems: row ? "center" : "initial",
          px: row ? 1 : 0,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: row ? 100 : "initial",
            height: row ? 100 : "200px",
            objectFit: row ? "cover" : "initial",
            borderRadius: row ? "50%" : "10px",
            flexShrink: 0,
          }}
          loading="lazy"
          image={workout.image}
          alt={"workout"}
        />
        <CardContent
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              {getTranslation2(workout, "title")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getTranslation2(workout, "description")}
            </Typography>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                maxWidth: "100%",
                gap: 1,
                mt: 1,
              }}
            >
              <Chip label={workout.type} variant="outlined" />
              <Chip label={workout.difficulty_level} variant="outlined" />
              <Chip label={`${workout.duration} mins`} variant="outlined" />
              <Chip
                label={getTranslation2(workout, "motivational_message")}
                color="primary"
                variant="outlined"
              />
              <Chip
                label={workout.is_Active ? "Active" : "Inactive"}
                color={workout.is_Active ? "success" : "default"}
                variant="outlined"
              />
            </Stack>

            {workout.exercises &&
              withAction &&
              workout.exercises.length > 0 && (
                <Box
                  sx={{
                    mt: 2,
                    px: 2,
                    pb: 2,
                    overflowX: "auto",
                    display: "flex",
                    maxWidth: "100%",
                    gap: 2,
                  }}
                >
                  {workout.exercises.map((exercise) => (
                    <Link
                      key={exercise.id}
                      to={`/${base}/dashboard/exercises/${exercise.id}`}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          height: 100,
                          width: 100,
                          borderRadius: 3,
                        }}
                        loading="lazy"
                        image={
                          exercise.image_urls?.[0] ||
                          "https://imageplaceholder.net/100x100/eeeeee/131313?text=No+Image"
                        }
                        alt={getTranslation2(exercise, "name")}
                      />
                    </Link>
                  ))}
                </Box>
              )}
          </Box>
          {withAction && (
            <Box>
              <Button
                component={Link}
                to={`/${base}/dashboard/workout/${workout.id}`}
                fullWidth
                variant="contained"
              >
                {t("templates.manageWorkout")}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

const WorkoutLibrary = () => {
  const { data, isLoading, isError } = useGetWorkoutTemplate();
  const { getTranslation2 } = useGetTranslation();
  const { t } = useTranslation();
  const { base } = useAuthContext();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading templates</Typography>;

  return (
    <Box>
      <Button
        component={Link}
        to={`/${base}/dashboard/workout/create?type=template`}
        variant="contained"
      >
        {t("templates.create")}
      </Button>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={gridSpacing}>
          {data?.data.map((workout) => (
            <Grid key={workout.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <WorkoutTemplateCard workout={workout} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
  //     <Grid container spacing={2}>
  //       {data?.data.map((workout) => {
  //         return (
  //           <Grid item xs={12} sm={6} md={4} lg={3} key={workout.id}>
  //             <Card
  //               sx={{ height: "100%", display: "flex", flexDirection: "column" }}
  //             >
  //               <CardMedia
  //                 component="img"
  //                 height="180"
  //                 image={workout.image}
  //                 alt={"workout"}
  //               />
  //               <CardContent sx={{ flexGrow: 1 }}>

  //               </CardContent>

  //               {workout.exercises?.length > 0 && (
  //                 <Box
  //                   sx={{
  //                     px: 2,
  //                     pb: 2,
  //                     overflowX: "auto",
  //                     display: "flex",
  //                     gap: 1,
  //                   }}
  //                 >
  //                   {workout.exercises.map((exercise) => (
  //                     <CardMedia
  //                       key={exercise.id}
  //                       component="img"
  //                       sx={{ height: 60, width: 60, borderRadius: 1 }}
  //                       image={
  //                         exercise.image_urls?.[0] ??
  //                         "https://via.placeholder.com/60?text=No+Image"
  //                       }
  //                       alt={getTranslation2(exercise, "name")}
  //                     />
  //                   ))}
  //                 </Box>
  //               )}
  //             </Card>
  //           </Grid>
  //         );
  //       })}
  //     </Grid>
  //   );
};

export default WorkoutLibrary;
