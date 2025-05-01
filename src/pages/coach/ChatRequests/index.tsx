import React from "react";
import { useGetChatRequests } from "../../../api/chat-requests";
import { Box } from "@mui/material";
import Table from "../../../components/Table";
import { chatRequestColumns } from "../../../tables-def/chat-requests";

const ChatRequests = () => {
  const chatRequests = useGetChatRequests();
  console.log(chatRequests.data?.data);
  return (
    <Box>
      <Table
        state={{
          isLoading: chatRequests.isLoading,
        }}
        data={chatRequests.data?.data || []}
        columns={chatRequestColumns}
      />
    </Box>
  );
};

export default ChatRequests;
