import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { AxiosError, AxiosProgressEvent, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { Exercise } from "../../tables-def/excercise";
import { useAuthContext } from "../../providers/AuthProvider";
import { useState } from "react";

export const useCreateExercise = () => {
  const [progress, setProgress] = useState(0);
  const createExercise = (data: any) => {
    return request({
      url: "/coach/exercise",
      method: "post",
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total!
        );
        setProgress(percentCompleted);
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-exercise"],
    mutationFn: createExercise,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-exercises"],
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return { createExercice: mutation, progress };
};

export const useGetLeaderBoard = (exc_id: number) => {
  const getLeaderBoard = (): Promise<AxiosResponse<Exercise[]>> => {
    return request({
      url: "/coach/leaderboards",
      params: {
        exercise_id: exc_id,
      },
    });
  };

  const query = useQuery({
    queryKey: ["get-excercise-leader-board"],
    queryFn: getLeaderBoard,
  });

  return query;
};

export const useUpdateExercise = () => {
  const [progress, setProgress] = useState(0);
  const { exerciseID } = useParams();
  const updateExercise = (data: any) => {
    return request({
      url: `/coach/exercise/${exerciseID}`,
      method: "put",
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total!
        );
        setProgress(percentCompleted);
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-exercise"],
    mutationFn: updateExercise,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`show-exercise-${exerciseID}`],
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return { updateExercice: mutation, progress };
};

export const useGetExercises = () => {
  const getExercises = (): Promise<AxiosResponse<Exercise[]>> => {
    return request({
      url: "/coach/exercise",
    });
  };

  const query = useQuery({
    queryKey: ["get-exercises"],
    queryFn: getExercises,
  });

  return query;
};

export const useShowExercise = () => {
  const { exerciseID } = useParams();
  const showExercise = async (): Promise<{ data: Exercise }> => {
    return request({
      url: `/coach/exercise/${exerciseID}`,
    });
  };

  const query = useQuery<{ data: Exercise }>({
    queryKey: [`show-exercise-${exerciseID}`],
    queryFn: showExercise,
  });

  return query;
};

export const useDeleteExercise = () => {
  const { exerciseID } = useParams();
  const { base } = useAuthContext();
  const navigate = useNavigate();
  const deleteExercise = async () => {
    return request({
      url: `/coach/exercise/${exerciseID}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-exercise"],
    mutationFn: deleteExercise,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-exercises"],
      });
      navigate(`/${base}/dashboard/exercises`);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};
