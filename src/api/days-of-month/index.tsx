import { AxiosResponse } from "axios";
import { request } from "../baseRequest";
import { useQuery } from "@tanstack/react-query";

export const useGetDaysOfMonth = () => {
  const getDaysOfMonth = (): Promise<
    AxiosResponse<{ dates: { date: string; day: string }[] }>
  > => {
    return request({
      url: "/kitchen/daysOfMonth",
    });
  };

  const query = useQuery({
    queryKey: ["get-days-of-month"],
    queryFn: getDaysOfMonth,
  });

  return query;
};
