import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request, ServerResponse } from "../baseRequest";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { DeliveryTime } from "../../tables-def/delivery-times";

export const useGetDeliveryTimes = () => {
  const getDeliveryTimes = (): Promise<AxiosResponse<DeliveryTime[]>> => {
    return request({
      url: "/admin/delivery-time",
    });
  };

  const query = useQuery({
    queryKey: ["get-delivery-times"],
    queryFn: getDeliveryTimes,
  });

  return query;
};

export const useCreateDeliveryTime = () => {
  const createDeliveryTime = (data: any) => {
    return request({
      url: "/admin/delivery-time",
      method: "post",
      data,
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-delivery-time"],
    mutationFn: createDeliveryTime,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-delivery-times"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return mutation;
};

export const useDeleteDeliveryTime = () => {
  const deleteDeliveryTime = (id: number) => {
    return request({
      url: `/admin/delivery-time/${id}`,
      method: "delete",
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-delivery-time"],
    mutationFn: deleteDeliveryTime,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-delivery-times"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return mutation;
};

export const useUpdateDeliveryTime = () => {
  const updateDeliveryTime = ({ data, id }: { data: any; id: number }) => {
    return request({
      url: `/admin/delivery-time/${id}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-delivery-time"],
    mutationFn: updateDeliveryTime,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-delivery-times"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return mutation;
};
