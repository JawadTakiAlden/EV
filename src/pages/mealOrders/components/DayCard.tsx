import { Typography } from "@mui/material";
import React from "react";
import MainCard from "../../../components/MainCard";

const DayCard = ({ title, date }: { title: string; date: string }) => {
  return (
    <MainCard border={false}>
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "calc(16px + 0.1vw)",
        }}
      >
        {title}
      </Typography>
      <Typography>{date}</Typography>
    </MainCard>
  );
};

export default DayCard;
