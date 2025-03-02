import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { AxiosResponse } from "axios";
import { Record } from "../../pages/Chat/components/UserChatRow";
import { MessageResponse } from "../../pages/Chat/components/MessageRenderer";

export const useGetChats = () => {
  const getChats = (): Promise<AxiosResponse<{ chats: Record[] }>> => {
    return request({
      url: "/coach/chats",
    });
  };

  const query = useQuery({
    queryKey: ["get-chats"],
    queryFn: getChats,
  });

  return query;
};

export const useGetMessages = (chatId: number | null) => {
  const getMessages = (): Promise<
    AxiosResponse<{ messages: MessageResponse[] }>
  > => {
    return request({
      url: `/coach/messages?chat_id=${chatId}`,
    });
  };

  const query = useQuery({
    queryKey: [`get-messags-of-chat-${chatId}`],
    queryFn: getMessages,
    enabled: !!chatId,
  });
  return query;
};

export const useSendMessage = () => {
  const sendMessage = (data: any) => {
    return request({
      url: `/coach/message`,
      method: "post",
      data,
    });
  };

  const mutation = useMutation({
    mutationKey: ["send-message"],
    mutationFn: sendMessage,
  });

  return mutation;
};
