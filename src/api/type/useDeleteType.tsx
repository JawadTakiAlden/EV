import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const useDeleteType = () => {
  const deleteType = (typeId: number) => {
    return request({
      url: `/admin/types/${typeId}`,
      method: "delete",
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-type"],
    mutationFn: deleteType,
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

export default useDeleteType;
