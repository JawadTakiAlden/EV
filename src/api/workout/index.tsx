import { useMutation, useQuery } from "@tanstack/react-query";
import { request, ServerResponse } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useCreateWorkout as useCreateWorkoutStore } from "../../pages/Workout/components/WorkoutForm";
import { useParams } from "react-router";

export const useGetWorkout = () => {
  const getWorkouts = () => {
    return request({
      url: "/",
    });
  };

  const query = useQuery({
    queryKey: ["get-workouts"],
    queryFn: getWorkouts,
  });

  return query;
};

export const useShowWorkout = () => {
  const { workoutID } = useParams();
  const showWorkouts = () => {
    return request({
      url: `/coach/workout/${workoutID}`,
    });
  };

  const query = useQuery({
    queryKey: [`show-workout-${workoutID}`],
    queryFn: showWorkouts,
  });

  return query;
};

export const useCreateWorkout = () => {
  const { reset } = useCreateWorkoutStore();
  const createWorkout = (data: any) => {
    return request({
      url: "/coach/workout",
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
      reset();
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};

export const useUpdateWorkout = () => {
  const { reset } = useCreateWorkoutStore();
  const updateWorkout = (data: any) => {
    return request({
      url: "/coach/workout",
      method: "post",
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
      reset();
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};

export const useDeleteWorkout = () => {
  const { workoutID } = useParams();
  const deleteWorkout = () => {
    return request({
      url: `/coach/workout/${workoutID}`,
      method: "delete",
    });
  };
  const mutation = useMutation({
    mutationKey: ["delete-workout"],
    mutationFn: deleteWorkout,
    onSuccess: (res: AxiosResponse<ServerResponse<any>>) => {
      toast(res.data.message);
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};
