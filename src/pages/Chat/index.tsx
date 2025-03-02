import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import MyChatPeople from "./components/MyChatPeople";
import { useChat } from "./Store/chatStore";
import MessageRenderer from "./components/MessageRenderer";
import { useGetChats } from "../../api/chats";
import LoadingDataError from "../../components/LoadingDataError";

const MainChat = () => {
  const { selectedUser } = useChat();

  const theme = useTheme();
  const mathcDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const chats = useGetChats();

  if (chats.isError) {
    return <LoadingDataError refetch={chats.refetch} />;
  }

  const DownSmLayout = () => {
    return selectedUser ? (
      <MessageRenderer user={selectedUser} />
    ) : (
      <MyChatPeople query={chats} />
    );
  };

  const UpSmLayout = () => {
    return (
      <Stack flexDirection={"row"}>
        {/* people to chat */}
        <Box sx={{ flexShrink: 0 }}>
          <MyChatPeople query={chats} />
        </Box>
        {/* selected chat */}
        <Box sx={{ flex: 1 }}>
          <MessageRenderer user={selectedUser} />
        </Box>
      </Stack>
    );
  };

  return mathcDownSm ? <DownSmLayout /> : <UpSmLayout />;
};

export default MainChat;
