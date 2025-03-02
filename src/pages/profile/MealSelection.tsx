import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { MealSelection as MealSelectionModel } from "../../tables-def/user-profile";
import MainCard from "../../components/MainCard";
import MealCard from "../meals/components/MealCard";
import { getNextWeekDays } from "../../utils/getNextWeekDays";
import { useTranslation } from "react-i18next";
import HorizintalMealCard from "../meals/components/HorizintalMealCard";
import { useGetDaysOfMonth } from "../../api/days-of-month";

const Selection: React.FC<ListChildComponentProps<MealSelectionModel[]>> = ({
  index,
  style,
  data,
}) => {
  const selection = data[index];
  const { t } = useTranslation();
  return (
    <div
      style={{
        ...style,
        width: "300px",
      }}
      key={index}
    >
      <MainCard border={false} cardContent={false} sx={{ p: 0 }}>
        <Box
          sx={{
            p: 1,
          }}
        >
          <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
            {t("userProfile.meal_selection.day")} :{" "}
            {t("days." + selection.day.toLowerCase())}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <HorizintalMealCard meal={selection.meal} withExtraInfo={false} />
        </Box>
      </MainCard>
    </div>
  );
};

const MealSelection = ({
  mealSelection,
}: {
  mealSelection: MealSelectionModel[];
}) => {
  const days = useGetDaysOfMonth();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!days.isLoading && !days.isError) {
      if (days.data?.data?.dates?.length) {
        setSelectedDay(days.data?.data.dates[0].date);
      }
    }
  }, [days.isLoading]);
  return (
    <Box>
      <SectionTitle>{t("userProfile.meal_selection.title")}</SectionTitle>
      <Box sx={{ overflowX: "scroll" }}>
        <Stack
          mb={1}
          flexWrap={"nowrap"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={0.5}
        >
          {days.data?.data?.dates.map(({ day, date }) => (
            <Button
              sx={{ flexShrink: 0 }}
              color={selectedDay === day ? "primary" : "inherit"}
              onClick={() => {
                setSelectedDay(date);
              }}
              variant={selectedDay === date ? "outlined" : "text"}
            >
              {t("days." + day.toLowerCase())}
              <br />
              {date}
            </Button>
          ))}
        </Stack>
      </Box>
      <List
        itemCount={
          mealSelection?.filter((ms) => ms.day === selectedDay)?.length || 0
        }
        direction={i18n.language === "ar" ? "rtl" : "ltr"}
        itemSize={310}
        height={300}
        width={1000}
        itemData={mealSelection?.filter((ms) => ms.day === selectedDay) || []}
        layout="horizontal"
        style={{
          width: "100%",
        }}
      >
        {Selection}
      </List>
    </Box>
  );
};

export default MealSelection;
