import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { numberOfLines } from "../../../utils/maxLinesNumber";
import useGetGetDarkValue from "../../../utils/useGetGetDarkValue";
import {
  ConversationRow,
  useChatContext,
} from "../../../providers/ChatProvider";

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

const UserChatRow = ({ chatRow }: { chatRow: ConversationRow }) => {
  const { getVlaue } = useGetGetDarkValue();
  const { setSelectedChatId, setUserSelectedId } = useChatContext();
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
        setSelectedChatId(chatRow.id);
        setUserSelectedId(chatRow.user.id);
      }}
    >
      <Box>
        <Avatar />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontWeight: chatRow.hasUnReadMessages ? "800" : "600",
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
            {chatRow.lastMessage.content}
          </Typography>
        </Box>
        {chatRow.hasUnReadMessages && (
          <Box>
            <Badge
              color="primary"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              badgeContent={chatRow.unreadMessageCount}
              slotProps={{
                badge: {
                  style: {
                    transform: "none",
                    position: "relative",
                  },
                },
              }}
            />
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default UserChatRow;
