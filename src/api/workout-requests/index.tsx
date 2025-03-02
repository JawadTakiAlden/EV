import { useQuery } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { AxiosResponse } from "axios";
import { WorkoutRequest } from "../../tables-def/workout-request";

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
