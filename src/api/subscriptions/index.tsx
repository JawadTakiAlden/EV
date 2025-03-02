import { useMutation, useQuery } from "@tanstack/react-query";
import { request, ServerResponse } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { SubscriptionModel } from "../../tables-def/subscription";
import { MealSubscriptionModel } from "../../tables-def/meal-subscriptions";

export const useGetMealSubscription = () => {
  const getMealSubscription = (): Promise<
    AxiosResponse<MealSubscriptionModel[]>
  > => {
    return request({
      url: "/admin/meal-subscriptions",
    });
  };

  const query = useQuery({
    queryKey: ["get-meal-subscription"],
    queryFn: getMealSubscription,
  });

  return query;
};

export const useCancelMealSubscription = () => {
  const cancelMealSubscription = (mealSubscriptionId: number) => {
    return request({
      url: `/admin/cancel-meal-subscription/${mealSubscriptionId}`,
      method: "post",
    });
  };

  const mutation = useMutation({
    mutationKey: ["cancel-meal-subscription"],
    mutationFn: cancelMealSubscription,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
    },
    onError: (err: AxiosError<ServerResponse>) => {
      toast(err?.response?.data?.message);
    },
  });

  return mutation;
};

export const useGetFitnessSubscription = () => {
  const getFitnessSubscription = (): Promise<
    AxiosResponse<SubscriptionModel[]>
  > => {
    return request({
      url: "/admin/subscriptions",
    });
  };

  const query = useQuery({
    queryKey: ["get-fitness-subscription"],
    queryFn: getFitnessSubscription,
  });

  return query;
};

export const useCancelFitnessSubscription = () => {
  const cancelFitnessSubscription = (fitnessSubscriptionId: number) => {
    return request({
      url: `/admin/cancel-subscription/${fitnessSubscriptionId}`,
      method: "post",
    });
  };

  const mutation = useMutation({
    mutationKey: ["cancel-fitness-subscription"],
    mutationFn: cancelFitnessSubscription,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
    },
    onError: (err: AxiosError<ServerResponse>) => {
      toast(err?.response?.data?.message);
    },
  });

  return mutation;
};

export const useGetFitnessSubscriptionStats = (type : string = 'group') => {
  const getFitnessSubscriptionStats = () => {
    return request({
      url : '/stats/activeFitnessSubscriptions',
      params : {
        type
      }
    })
  }


  const query = useQuery({
    queryKey : [`get-fitness-subscriptions-${type}`],
    queryFn : getFitnessSubscriptionStats
  })


  return query
  
}



export const useGetActiveMealsSubscriptionStats = () => {
  const getFitnessSubscriptionStats = () => {
    return request({
      url : '/stats/activeMealsSubscriptions',
    })
  }


  const query = useQuery({
    queryKey : [`get-active-meals-subscriptions`],
    queryFn : getFitnessSubscriptionStats
  })


  return query
  
}