import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import MyChatPeople from "./components/MyChatPeople";
import MessageRenderer from "./components/MessageRenderer";
import { useChatContext } from "../../providers/ChatProvider";

const MainChat = () => {
  const { selectedChatId } = useChatContext();

  const theme = useTheme();
  const mathcDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const DownSmLayout = () => {
    return selectedChatId ? (
      <MessageRenderer chatId={selectedChatId} />
    ) : (
      <MyChatPeople />
    );
  };

  const UpSmLayout = () => {
    return (
      <Stack flexDirection={"row"}>
        {/* people to chat */}
        <Box sx={{ flexShrink: 0 }}>
          <MyChatPeople />
        </Box>
        {/* selected chat */}
        <Box sx={{ flex: 1 }}>
          <MessageRenderer chatId={selectedChatId} />
        </Box>
      </Stack>
    );
  };

  return mathcDownSm ? <DownSmLayout /> : <UpSmLayout />;
};

export default MainChat;
