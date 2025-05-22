import { Box, Skeleton, Stack, Typography } from "@mui/material";
import UserChatRow from "./UserChatRow";
import { useChatContext } from "../../../providers/ChatProvider";
import { useTranslation } from "react-i18next";

const MyChatPeople = ({}) => {
  const { chats, isLoading } = useChatContext();
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "300px" },
        flexShrink: 0,
        height: "calc(100vh - 70px - 24px)",
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
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
          {t("chat.title")}
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
          <Typography textAlign={"center"}>
            {t("chat.noChatsMessage")}
          </Typography>
        ) : (
          chats.map((chat, i) => <UserChatRow chatRow={chat} key={i} />)
        )}
      </Stack>
    </Box>
  );
};

export default MyChatPeople;
