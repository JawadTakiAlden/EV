import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request, ServerResponse } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../../providers/AuthProvider";
import { Meal } from "../../tables-def/meals";

export const useCreateMeal = () => {
  const createMeal = (data: any) => {
    return request({
      url: "/admin/meals",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-meal"],
    mutationFn: createMeal,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-meals"],
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};

export const useGetMeals = () => {
  const getMeals = (): Promise<AxiosResponse<Meal[]>> => {
    return request({
      url: "/admin/meals",
    });
  };

  const query = useQuery({
    queryKey: ["get-meals"],
    queryFn: getMeals,
  });

  return query;
};

export const useShowMeal = () => {
  const { mealId } = useParams();
  const showMeals = () => {
    return request({
      url: `/admin/meals/${mealId}`,
    });
  };

  const query = useQuery({
    queryKey: [`show-meal-${mealId}`],
    queryFn: showMeals,
  });

  return query;
};

export const useDeleteMeal = () => {
  const { base } = useAuthContext();
  const { mealId } = useParams();
  const navigate = useNavigate();
  const deleteMeal = () => {
    return request({
      url: `/admin/meals/${mealId}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-meal"],
    mutationFn: deleteMeal,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-meals"],
      });
      navigate(`/${base}/dashboard/meals`);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};

export const useUpdateMeal = () => {
  const { mealId } = useParams();
  const updateMeal = (data: any) => {
    return request({
      url: `/admin/meals/${mealId}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-meal"],
    mutationFn: updateMeal,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`show-meal-${mealId}`],
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};

export const useAssignMealsToDay = () => {
  const assignMealsToDay = (data: any) => {
    return request({
      url: "/admin/assign-meals",
      method: "post",
      data,
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["assign-meals-to-days"],
    mutationFn: assignMealsToDay,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`get-meals-of-week`],
      });
    },
    onError: (err: AxiosError<ServerResponse>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};

export const useGetMealsOfWeek = () => {
  const getMealsOfWeek = (): Promise<
    AxiosResponse<{ day: { day: string }; meals: { id: number }[] }[]>
  > => {
    return request({
      url: "/admin/week-meals",
    });
  };

  const query = useQuery({
    queryKey: ["get-meals-of-week"],
    queryFn: getMealsOfWeek,
  });

  return query;
};
