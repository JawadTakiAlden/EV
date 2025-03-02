import { Box, Typography } from "@mui/material";
import { MessageResponse } from "./MessageRenderer";

const JustifyStartMessage = ({ message }: { message: MessageResponse }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <Typography
        sx={{
          maxWidth: "70%",
          p: 1,
          borderRadius: "10px",
          backgroundColor: "background.default",
          color: (theme) => theme.palette.text.primary,
        }}
      >
        {message.content}
      </Typography>
    </Box>
  );
};

export default JustifyStartMessage;
