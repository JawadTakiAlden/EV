import { Box, Typography } from "@mui/material";
import { MessageResponse } from "./MessageRenderer";
import useGetGetDarkValue from "../../../utils/useGetGetDarkValue";

const JustifyStartMessage = ({ message }: { message: MessageResponse }) => {
  const { getVlaue } = useGetGetDarkValue();
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
          backgroundColor: getVlaue("grey.800", "grey.200"),
          color: (theme) => theme.palette.text.primary,
        }}
      >
        {message.content}
      </Typography>
    </Box>
  );
};

export default JustifyStartMessage;
