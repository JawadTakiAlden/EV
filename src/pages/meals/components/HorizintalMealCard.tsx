import React from "react";
import { Meal } from "../../../tables-def/meals";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../../utils/useGetTranslation";
import MainCard from "../../../components/MainCard";
import {
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { numberOfLines } from "../../../utils/maxLinesNumber";
import HtmlTooltip from "../../../components/HtmlTooltip";

const HorizintalMealCard = ({
  meal,
  withAction = true,
  withExtraInfo = true,
}: {
  meal: Meal;
  withAction?: boolean;
  withExtraInfo?: boolean;
}) => {
  const { user, base } = useAuthContext();
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();
  withAction = user?.role === "admin" || user?.role === "kitchen_staff";
  return (
    <HtmlTooltip
      followCursor
      enterDelay={500}
      enterNextDelay={500}
      title={
        <React.Fragment>
          <Typography mb={1}>{t("mealCard.types")} : </Typography>
          <Stack mb={1} mt={1} flexDirection={"row"} gap={1} flexWrap={"wrap"}>
            {meal.types.map((type) => {
              return (
                <Chip key={type.id} label={getTranslation2(type, "title")} />
              );
            })}
          </Stack>
          <Typography mb={1}>{t("mealCard.ingredient")} : </Typography>
          <Stack mt={1} flexDirection={"row"} gap={1} flexWrap={"wrap"}>
            {meal.ingredients.map((ingred) => {
              return (
                <Chip
                  key={ingred.id}
                  label={
                    getTranslation2(ingred, "title") +
                    ` (${ingred.quantity} ${ingred.unit})`
                  }
                />
              );
            })}
          </Stack>
        </React.Fragment>
      }
    >
      <MainCard
        sx={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 1,
        }}
        border={false}
        cardContent={false}
      >
        <Box>
          <CardHeader
            title={getTranslation2(meal, "name")}
            sx={{
              ...numberOfLines(1),
            }}
          />
          <Box
            sx={{
              display: "flex",
            }}
          >
            <CardMedia
              component={"img"}
              sx={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
              image={meal.images[0]}
              height={180}
            />

            <CardContent>
              <Typography
                mb={1}
                variant="body2"
                sx={{ color: "text.secondary", ...numberOfLines(3) }}
              >
                {getTranslation2(meal, "description")}
              </Typography>
              <Typography variant="body2">
                {t("mealCard.calories")} : {meal.calories}
              </Typography>
            </CardContent>
          </Box>
        </Box>
      </MainCard>
    </HtmlTooltip>
  );
};

export default HorizintalMealCard;
