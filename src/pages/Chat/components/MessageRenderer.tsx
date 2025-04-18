import {
  alpha,
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { IoArrowBackCircle } from "react-icons/io5";
import JustifyStartMessage from "./JustifyStartMessage";
import JustifyEndMessage from "./JustifyEndMessage";
import { useEffect, useRef, useState } from "react";
import SendMessage from "./SendMessage";
import { useChat } from "../Store/chatStore";
import { useAuthContext } from "../../../providers/AuthProvider";
import { request } from "../../../api/baseRequest";
import socket from "../socket";
import JustInViewRender from "../../../components/JustInViewRender";
import { useChatContext } from "../../../providers/ChatProvider";

export interface Sender {
  id: number;
  name: string;
  role: string; // Consider using a union type if roles are predefined, e.g., 'coach' | 'user' | 'admin'
}

export interface MessageResponse {
  id: number;
  content: string;
  file: string | null;
  chat_id: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  sender: Sender;
}

const MessageRenderer = ({ chatId }: { chatId: number | undefined }) => {
  // const [messages, setMessages] = useState<MessageResponse[]>([]);
  const authContext = useAuthContext();
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const { chats, messages, setSelectedChatId } = useChatContext();

  const user = chats.find((chat) => chat.id === chatId)?.user;

  if (!user) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Typography variant="h3" textAlign={"center"} mb={1}>
          Fitness chat
        </Typography>
        <Typography
          sx={{
            color: "grey.600",
          }}
          variant="h5"
          textAlign={"center"}
        >
          send and recive messages easily with height performance chat app ,
          select user and start
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundImage: (theme) =>
          `radial-gradient(${alpha(
            theme.palette.divider,
            0.07
          )} 1px, transparent 1px)`,
        backgroundSize: `10px 10px`,
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          px: 2,
          justifyContent: "space-between",
          backgroundColor: (theme) => theme.palette.background.default,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Avatar src={user?.image} />
          <Typography>{user?.name}</Typography>
        </Stack>

        <IconButton
          onClick={() => setSelectedChatId(undefined)}
          sx={{
            display: { md: "none" },
          }}
        >
          <IoArrowBackCircle />
        </IconButton>
      </Box>
      <Box
        ref={messageContainerRef}
        sx={{
          height: "calc(100vh - 115px)",
          overflowY: "auto",
          py: 1,
          px: 0.5,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages?.map((message, i) =>
          message.sender.id === authContext?.user?.id ? (
            <JustInViewRender>
              <JustifyEndMessage message={message} />
            </JustInViewRender>
          ) : (
            <JustInViewRender>
              <JustifyStartMessage message={message} />
            </JustInViewRender>
          )
        )}
      </Box>
      <Box
        sx={{
          height: "45px",
          backdropFilter: "blur(1px)",
          pt: 0,
        }}
      >
        <SendMessage />
      </Box>
    </Box>
  );
};

export default MessageRenderer;
