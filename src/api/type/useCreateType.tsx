import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const useCreateType = () => {
  const createType = (data: any) => {
    return request({
      url: "/admin/types",
      method: "post",
      data,
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-type"],
    mutationFn: createType,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({ queryKey: ["get-types"] });
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};

export default useCreateType;
