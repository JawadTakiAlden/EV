import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request, ServerResponse } from "../baseRequest";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const useGetAllCoupons = (
  planFilterId: number | string,
  mealPlanFilter: number | string
) => {
  const getAllCoupons = (): Promise<AxiosResponse<any[]>> => {
    return request({
      url: "/admin/coupons",
      params: {
        package_id: planFilterId !== -1 ? planFilterId : null,
        meal_plan_id: mealPlanFilter !== -1 ? mealPlanFilter : null,
      },
    });
  };
  const query = useQuery({
    queryKey: [`get-all-coupons`],
    queryFn: getAllCoupons,
  });

  return query;
};

export const useCreateGlobalCoupons = () => {
  const createGlobalCoupons = (data: any) => {
    return request({
      url: "/admin/coupons",
      method: "post",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-global-coupons"],
    mutationFn: createGlobalCoupons,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-all-coupons"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};

export const useDeleteCoupons = () => {
  const deleteCoupons = (id: number) => {
    return request({
      url: `/admin/coupons/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-coupons"],
    mutationFn: deleteCoupons,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-all-coupons"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};
export const useUpdateCoupons = () => {
  const updateCoupons = ({ id, data }: { id: number; data: any }) => {
    return request({
      url: `/admin/coupons/${id}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-coupons"],
    mutationFn: updateCoupons,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-all-coupons"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};
