import { useMutation, useQuery } from "@tanstack/react-query";
import { request, ServerResponse } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { WorkoutRequest } from "../../tables-def/workout-request";
import { WorkoutModel } from "../../tables-def/workout";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

export const useGetWorkoutRequests = () => {
  const getUserWorkoutRequest = (): Promise<
    AxiosResponse<WorkoutRequest[]>
  > => {
    return request({
      url: "/coach/workout-requests",
    });
  };

  const query = useQuery({
    queryKey: ["get-workout-requests"],
    queryFn: getUserWorkoutRequest,
  });

  return query;
};

export const useGetWorkoutTemplate = () => {
  const getWorkoutTemplates = (): Promise<AxiosResponse<WorkoutModel[]>> => {
    return request({
      url: "/coach/workouts/templates",
    });
  };

  const query = useQuery({
    queryKey: ["get-workout-templates"],
    queryFn: getWorkoutTemplates,
  });

  return query;
};

export const useCreateWorkoutTemplate = () => {
  const createWorkout = (data: any) => {
    return request({
      url: "/coach/workouts/templates",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };
  const mutation = useMutation({
    mutationKey: ["create-workout"],
    mutationFn: createWorkout,
    onSuccess: (res: AxiosResponse<ServerResponse<any>>) => {
      toast(res.data.message);
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};

export const useUpdateWorkoutTemplate = () => {
  const { workoutID } = useParams();
  const updateWorkout = (data: any) => {
    return request({
      url: `/coach/workouts/templates/${workoutID}`,
      method: "put",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const mutation = useMutation({
    mutationKey: ["update-workout"],
    mutationFn: updateWorkout,
    onSuccess: (res: AxiosResponse<ServerResponse<any>>) => {
      toast(res.data.message);
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};
export const useDeleteWorkoutTemplate = () => {
  const { workoutID } = useParams();
  const navigate = useNavigate();
  const updateWorkout = () => {
    return request({
      url: `/coach/workouts/templates/${workoutID}`,
      method: "delete",
    });
  };

  const mutation = useMutation({
    mutationKey: ["delete-workout"],
    mutationFn: updateWorkout,
    onSuccess: (res: AxiosResponse<ServerResponse<any>>) => {
      toast(res.data.message);
      navigate(-1);
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};

export const useCreateWorkoutFromTemplate = () => {
  const createWorkoutFromTemplate = (data: any) => {
    return request({
      url: "/coach/workouts/from-template",
      method: "post",
      data,
    });
  };
  const mutation = useMutation({
    mutationKey: ["create-workout-from-template"],
    mutationFn: createWorkoutFromTemplate,
    onSuccess: (res: AxiosResponse<ServerResponse<any>>) => {
      toast(res.data.message);
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};
