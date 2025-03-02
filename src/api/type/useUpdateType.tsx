import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const useUpdateType = () => {
  const updateType = (data: any) => {
    return request({
      url: `/admin/types/${data.id}`,
      method: "put",
      data: data,
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-type"],
    mutationFn: updateType,
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

export default useUpdateType;
