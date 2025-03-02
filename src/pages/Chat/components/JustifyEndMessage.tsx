import { Box, Typography } from "@mui/material";
import React from "react";
import { MessageResponse } from "./MessageRenderer";

const JustifyEndMessage = ({ message }: { message: MessageResponse }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Typography
        sx={{
          maxWidth: "70%",
          p: 1,
          borderRadius: "10px",
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
        }}
      >
        {message.content}
      </Typography>
    </Box>
  );
};

export default JustifyEndMessage;
