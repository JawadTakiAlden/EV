import { Box, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import SearchOrStartNewChat from "./SearchOrStartNewChat";
import UserChatRow, { Record } from "./UserChatRow";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../providers/AuthProvider";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useChatContext } from "../../../providers/ChatProvider";

const MyChatPeople = ({}) => {
  const { base } = useAuthContext();
  const { chats, isLoading } = useChatContext();
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "300px" },
        flexShrink: 0,
        height: "100vh",
        maxHeight: "100vh",
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        p: 0.5,
      }}
    >
      <Stack flexDirection={"row"} gap={1}>
        <Typography
          sx={{
            fontSize: "calc(0.15vw + 18px)",
            mb: 1,
            fontWeight: "600",
          }}
        >
          Chats
        </Typography>
      </Stack>
      <Stack
        sx={{
          maxHeight: "calc(100vh - 110px)",
          overflowY: "auto",
        }}
      >
        {isLoading ? (
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box>
              <Skeleton variant="text" height={"30px"} width={"100px"} />
              <Skeleton variant="text" height={"20px"} width={"150px"} />
            </Box>
          </Stack>
        ) : chats.length === 0 ? (
          <Typography textAlign={"center"}>No Chats , Start one</Typography>
        ) : (
          chats.map((chat, i) => <UserChatRow chatRow={chat} key={i} />)
        )}
      </Stack>
    </Box>
  );
};

export default MyChatPeople;
