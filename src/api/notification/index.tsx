import { useMutation } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const usePushNotification = () => {
  const pushNotification = (data: any) => {
    return request({
      url: "/admin/push-notification",
      method: "post",
      data,
    });
  };

  const mutation = useMutation({
    mutationKey: ["push-notification"],
    mutationFn: pushNotification,
    onSuccess: (res: AxiosResponse<any>) => {
      toast(res.data.message);
    },
    onError: (err: AxiosError<any>) => {
      if (err.response) {
        toast(err.response?.data.message);
      }
    },
  });

  return mutation;
};
