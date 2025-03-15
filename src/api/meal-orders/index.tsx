import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { MealOrder } from "../../tables-def/meal-orders";
import { toast } from "react-toastify";

export const useGetMealOrders = () => {
  const [searchParams] = useSearchParams();

  const date = searchParams.get("date");
  console.log(date);
  const getMealOrders = () => {
    return request({
      url: "/kitchen/orders",
      params: {
        day: date,
      },
    });
  };

  const query = useQuery({
    queryKey: [`get-meal-orders-${date}`],
    queryFn: getMealOrders,
  });

  return query;
};

export const useGetMealOrdersDetail = () => {
  const { orderId } = useParams();
  const getMealOrders = (): Promise<AxiosResponse<MealOrder>> => {
    return request({
      url: `/kitchen/orders/${orderId}`,
    });
  };

  const query = useQuery({
    queryKey: [`get-meal-orders-${orderId}`],
    queryFn: getMealOrders,
  });

  return query;
};

export const useChangeOrderStatus = () => {
  const { orderId } = useParams();
  const changeOrderStatus = ({
    orderStatus,
    orderId,
  }: {
    orderStatus: string;
    orderId: number;
  }) => {
    return request({
      url: "/kitchen/order-status",
      method: "post",
      params: {
        order_id: orderId,
      },
      data: {
        status: orderStatus,
      },
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatus,
    onSuccess: (res: AxiosResponse<any>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`get-meal-orders-${orderId}`],
      });
    },
    onError: (err: AxiosError<any>) => {
      if (err.response) {
        toast(err.response.data.message);
      }
    },
  });

  return mutation;
};
