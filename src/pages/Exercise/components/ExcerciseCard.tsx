import React from "react";
import { Exercise } from "../../../tables-def/excercise";
import {
  alpha,
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import MainCard from "../../../components/MainCard";
import { Link } from "react-router-dom";
import { MdDeleteOutline, MdUpdate } from "react-icons/md";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useTranslation } from "react-i18next";

const ExcerciseCard = ({
  exercise,
  noActions = false,
  withBorder = false,
}: {
  exercise: Exercise;
  noActions?: boolean;
  withBorder?: boolean;
}) => {
  const { base } = useAuthContext();
  const { t } = useTranslation();
  return (
    <Box sx={{ height: "100%" }}>
      <MainCard
        sx={{
          p: 0,
          height: "100%",
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
          borderWidth: "4px",
          transition: "0.3s",
        }}
        border={withBorder}
        cardContent={false}
      >
        <CardMedia
          component="img"
          loading="lazy"
          height="194"
          image={exercise.image_urls?.[0]}
        />
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              boxOrient: "vertical",
              WebkitBoxOrient: "vertical",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              lineClamp: 1,
            }}
          >
            {exercise.name}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              my: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              boxOrient: "vertical",
              WebkitBoxOrient: "vertical",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              lineClamp: 2,
            }}
          >
            {exercise.description}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {t("excercise.duration")} : {exercise.duration}
          </Typography>
        </CardContent>
        {!noActions && (
          <CardActions>
            <Tooltip title={"see exercise informations"}>
              <Button
                size="small"
                color="primary"
                component={Link}
                to={`/${base}/dashboard/exercises/${exercise.id}`}
              >
                {t("global.more")}
              </Button>
            </Tooltip>
            <Tooltip title={"update exercise"}>
              <IconButton
                component={Link}
                to={`/${base}/dashboard/exercises/${exercise.id}?task=settings`}
                color="info"
              >
                <MdUpdate />
              </IconButton>
            </Tooltip>
            <Tooltip title={"delete exercise"}>
              <IconButton
                component={Link}
                to={`/${base}/dashboard/exercises/${exercise.id}?task=settings`}
                color="error"
              >
                <MdDeleteOutline />
              </IconButton>
            </Tooltip>
          </CardActions>
        )}
      </MainCard>
    </Box>
  );
};

export default ExcerciseCard;
