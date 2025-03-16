import MainCard from "../../../components/MainCard";
import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Meal } from "../../../tables-def/meals";
import { numberOfLines } from "../../../utils/maxLinesNumber";
import { MdExpandCircleDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../../utils/useGetTranslation";

const MealCard = ({
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
  withAction = user?.role === "admin";
  return (
    <MainCard
      sx={{
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 0,
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
        <CardMedia
          component={"img"}
          sx={{
            borderRadius: "12px",
          }}
          image={meal.images[0]}
          height={180}
        />
      </Box>
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
        {withExtraInfo && (
          <Box>
            <Typography variant="body2">
              {" "}
              {t("mealCard.protien")} : {meal.protein}
            </Typography>
            <Typography variant="body2">
              {" "}
              {t("mealCard.carb")} : {meal.carb}
            </Typography>
            <Typography variant="body2">
              {t("mealCard.fats")} : {meal.fats}
            </Typography>
            <Typography variant="body2">
              {t("mealCard.fiber")} : {meal.fiber}
            </Typography>
          </Box>
        )}
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
      </CardContent>
      {withAction && (
        <CardActions disableSpacing>
          <IconButton
            component={Link}
            to={`/${base}/dashboard/meals/${meal.id}`}
            sx={{
              transform: `rotate(-90deg)`,
              transition: "0.3s",
            }}
          >
            <MdExpandCircleDown />
          </IconButton>
        </CardActions>
      )}
    </MainCard>
  );
};

export default MealCard;
