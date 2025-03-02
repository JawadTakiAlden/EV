import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { request, ServerResponse } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { UserModel } from "../../tables-def/users";
import { useParams } from "react-router";
import {
  DietSubscription,
  FitnessSubscription,
  MealSelection,
  SurveyAnswer,
  UserProfileModel,
  WeightRecord,
} from "../../tables-def/user-profile";
import { toast } from "react-toastify";
import { WorkoutLog } from "../../tables-def/workout-logs";

export const useGetUsers = () => {
  const getUsers = (): Promise<AxiosResponse<{ users: UserModel[] }>> => {
    return request({
      url: "/coach/users",
    });
  };

  const query = useQuery({
    queryKey: ["get-users"],
    queryFn: getUsers,
  });

  return query;
};

export const useGetUsersWorkout = (day: string) => {
  const { userId } = useParams();
  const getUserWorkout = (): Promise<AxiosResponse<any>> => {
    return request({
      url: "/coach/user/workout",
      params: {
        user_id: userId,
        date: day,
      },
    });
  };

  const query = useQuery({
    queryKey: [`get-user-workout-for-user-${userId}-in-day-${day}`],
    queryFn: getUserWorkout,
    enabled: !!day,
  });

  return query;
};

export const useGetUserProfile = () => {
  const { userId } = useParams();
  const getUserProfile = (): Promise<AxiosResponse<UserProfileModel>> => {
    return request({
      url: `/coach/user/${userId}`,
    });
  };

  const query = useQuery({
    queryKey: [`get-user-profile-${userId}`],
    queryFn: getUserProfile,
  });

  return query;
};

export const useGetUserLogs = (page: number) => {
  const { userId } = useParams();
  const getUserLogs = (): Promise<
    AxiosResponse<{
      logs: WorkoutLog[];
      totalPages: number;
      currentPage: number;
    }>
  > => {
    return request({
      url: `/coach/logs/${userId}?page=${page}&limit=10`,
    });
  };

  const query = useQuery({
    queryKey: [`get-user-logs-${userId}-${page}`],
    queryFn: getUserLogs,
  });

  return query;
};

export const useGetUserWeightRecords = () => {
  const { userId } = useParams();
  const getUserWeight = () => {
    return request({
      url: `/coach/user/${userId}/weight-records`,
    });
  };

  const query = useQuery({
    queryKey: [`get-user-weight-records-${userId}`],
    queryFn: getUserWeight,
  });

  return query;
};

export const useGetUserInformations = () => {
  const { userId } = useParams();
  const getUserWeight = (): Promise<AxiosResponse<WeightRecord[]>> => {
    return request({
      url: `/coach/user/${userId}/weight-records`,
    });
  };
  const getFitnessSubscription = (): Promise<
    AxiosResponse<FitnessSubscription[]>
  > => {
    return request({
      url: `/coach/user/${userId}/fitness-subscriptions`,
    });
  };
  const getMealSubscription = (): Promise<
    AxiosResponse<DietSubscription[]>
  > => {
    return request({
      url: `/coach/user/${userId}/diet-subscriptions`,
    });
  };
  const getMealSelections = (): Promise<AxiosResponse<MealSelection[]>> => {
    return request({
      url: `/coach/user/${userId}/meal-selections`,
    });
  };
  const getSurveyAnswers = (): Promise<AxiosResponse<SurveyAnswer[]>> => {
    return request({
      url: `/coach/user/${userId}/survey-answers`,
    });
  };
  const getBasicInfo = (): Promise<AxiosResponse<UserProfileModel>> => {
    return request({
      url: `/coach/user/${userId}/basic`,
    });
  };

  const queries = useQueries({
    queries: [
      {
        queryKey: [`get-user-info-${userId}-basic`],
        queryFn: getBasicInfo,
      },
      {
        queryKey: [`get-user-info-${userId}-survey`],
        queryFn: getSurveyAnswers,
      },
      {
        queryKey: [`get-user-info-${userId}-meal-selections`],
        queryFn: getMealSelections,
      },
      {
        queryKey: [`get-user-info-${userId}-meal-subscription`],
        queryFn: getMealSubscription,
      },
      {
        queryKey: [`get-user-info-${userId}-fitness-subscription`],
        queryFn: getFitnessSubscription,
      },
      {
        queryKey: [`get-user-info-${userId}-user-weight`],
        queryFn: getUserWeight,
      },
    ],
  });

  return queries;
};

export const useDeActivateUser = () => {
  const { userId } = useParams();
  const deActivateUser = () => {
    return request({
      url: `/admin/users/deactivate/${userId}`,
      method: "post",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["deactivate-user"],
    mutationFn: deActivateUser,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`get-user-info-${userId}-basic`],
      });
    },
    onError: (err: AxiosError<ServerResponse>) => {
      toast(err.response?.data.message);
    },
  });

  return mutation;
};

export const useCreateNewUser = () => {
  const createNewUser = (data: any) => {
    return request({
      url: "/admin/users/create",
      method: "post",
      data,
    });
  };

  const mutation = useMutation({
    mutationKey: ["create-user"],
    mutationFn: createNewUser,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
    },
    onError: (err: AxiosError<ServerResponse>) => {
      toast(err.response?.data.message);
    },
  });

  return mutation;
};
