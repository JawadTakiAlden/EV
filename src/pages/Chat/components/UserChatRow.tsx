import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { numberOfLines } from "../../../utils/maxLinesNumber";
import useGetGetDarkValue from "../../../utils/useGetGetDarkValue";
import { useChat } from "../Store/chatStore";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Record {
  id: number;
  user_id: number;
  coach_id: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  lastMessage?: {
    content: string;
  };
  user: User;
}

const UserChatRow = ({ chatRow }: { chatRow: Record }) => {
  const { getVlaue } = useGetGetDarkValue();
  const { selectUser, selectChat, setMessages } = useChat();
  return (
    <Stack
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={1}
      sx={{
        cursor: "pointer",
        px: 1,
        py: 2,

        ":hover": {
          backgroundColor: getVlaue("grey.900", "grey.100"),
        },
      }}
      onClick={() => {
        selectUser(chatRow.user);
        selectChat(chatRow.id);
        setMessages(null);
      }}
    >
      <Box>
        <Avatar />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontWeight: "600",
            letterSpacing: "0.6px",
          }}
        >
          {chatRow.user.name}
        </Typography>
        <Typography
          sx={{
            ...numberOfLines(1),
            color: "grey.500",
          }}
        >
          {chatRow.lastMessage?.content}
        </Typography>
      </Box>
    </Stack>
  );
};

export default UserChatRow;
