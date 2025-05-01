import { AxiosError, AxiosResponse } from "axios";
import { request, ServerResponse } from "../baseRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetChatRequests = () => {
  const getChatRequests = (): Promise<AxiosResponse<any[]>> => {
    return request({
      url: "/coach/chat-requests",
    });
  };

  const query = useQuery({
    queryKey: ["get-chat-requests"],
    queryFn: getChatRequests,
  });

  return query;
};

export const useAcceptChatRequest = () => {
  const acceptChatRequest = (request_id: number) => {
    return request({
      url: "/coach/accept-request",
      method: "post",
      params: {
        request_id: request_id,
      },
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["accept-chat-request"],
    mutationFn: acceptChatRequest,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-chat-requests"],
      });
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err.response?.data.message);
    },
  });
  return mutation;
};
