import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { MealPlan } from "../../tables-def/meal-plans";
import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../../providers/AuthProvider";

export const useGetMealPlan = () => {
  const getMealPlan = async (): Promise<AxiosResponse<MealPlan[]>> => {
    return request({
      url: "/admin/meal-plans",
    });
  };

  const query = useQuery({
    queryKey: ["get-meal-plans"],
    queryFn: getMealPlan,
  });

  return query;
};

export const useShowMealPlan = () => {
  const { mealPlanId } = useParams();
  const getMealPlan = async (): Promise<AxiosResponse<MealPlan>> => {
    return request({
      url: `/admin/meal-plans/${mealPlanId}`,
    });
  };

  const query = useQuery({
    queryKey: [`show-meal-plan-${mealPlanId}`],
    queryFn: getMealPlan,
  });

  return query;
};

export const useCreateMealPlan = () => {
  const createMealPlan = (data: any) => {
    return request({
      url: "/admin/meal-plans",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-meal-plan"],
    mutationFn: createMealPlan,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-meal-plans"],
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};

export const useDeleteMealPlan = () => {
  const { mealPlanId } = useParams();
  const navigate = useNavigate();
  const { base } = useAuthContext();
  const deleteMealPlan = () => {
    return request({
      url: `/admin/meal-plans/${mealPlanId}`,
      method: "delete",
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-meal-plan"],
    mutationFn: deleteMealPlan,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-meal-plans"],
      });
      navigate(`/${base}/dashboard/meal-plans`);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};

export const useUpdateMealPlan = () => {
  const { mealPlanId } = useParams();
  const updateMealPlan = (data: any) => {
    return request({
      url: `/admin/meal-plans/${mealPlanId}`,
      method: "put",
      data,
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-meal-plan"],
    mutationFn: updateMealPlan,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`show-meal-plan-${mealPlanId}`],
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};
