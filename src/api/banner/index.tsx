import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";

export const useGetBanners = () => {
  const getBanners = () => {
    return request({
      url: "/admin/banner",
    });
  };

  const query = useQuery({
    queryKey: ["get-banners"],
    queryFn: getBanners,
  });

  return query;
};

export const useCreateBanner = () => {
  const createBanner = (data: any) => {
    return request({
      url: "/admin/banner",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-banner"],
    mutationFn: createBanner,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-banners"],
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};

export const useDeleteBanner = () => {
  const deleteBanner = (id: number) => {
    return request({
      url: `/admin/banner/${id}`,
      method: "delete",
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-banner"],
    mutationFn: deleteBanner,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-banners"],
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};
