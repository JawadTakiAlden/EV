import React from "react";
import { Box, Stack } from "@mui/material";
import DayCard from "./components/DayCard";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../providers/AuthProvider";
import { getNextWeekDays } from "../../utils/getNextWeekDays";
import { useGetDaysOfMonth } from "../../api/days-of-month";

const MealOrders = () => {
  const { base } = useAuthContext();
  const navigate = useNavigate();

  const days = useGetDaysOfMonth();

  return (
    <Box>
      <Stack flexDirection={"row"} flexWrap={"wrap"} gap={"8px"}>
        {days.data?.data?.dates?.map((day) => (
          <Box
            onClick={() => {
              navigate(
                `/${base}/dashboard/orders/orderOf/${day.day}?date=${day.date}`
              );
            }}
            key={day.day}
            sx={{
              cursor: "pointer",
              flex: 1,
              flexBasis: {
                xs: "100%",
                sm: "calc(50% - 8px)",
                md: "calc(25% - 8px)",
              },
              maxWidth: {
                xs: "100%",
                sm: "calc(50% - 8px)",
                md: "calc(25% - 8px)",
              },
            }}
          >
            <DayCard title={day.day} date={day.date} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default MealOrders;
