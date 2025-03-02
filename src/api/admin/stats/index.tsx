import { useQuery } from "@tanstack/react-query";
import { request } from "../../baseRequest";
import { AxiosResponse } from "axios";
import { AdminStats } from "../../../tables-def/admin-stats";

export const useGetStats = () => {
  const getStats = (): Promise<AxiosResponse<AdminStats>> => {
    return request({
      url: "/stats",
      params: {
        type: "group",
      },
    });
  };

  const query = useQuery({
    queryKey: ["get-stats"],
    queryFn: getStats,
  });

  return query;
};
export const useGetRenwalStats = () => {
  const getStats = (): Promise<AxiosResponse<any>> => {
    return request({
      url: "/stats/renewal-chart",
    });
  };

  const query = useQuery({
    queryKey: ["get-renwal-stats"],
    queryFn: getStats,
  });

  return query;
};
export const useGetRenwalFoodStats = () => {
  const getStats = (): Promise<AxiosResponse<any>> => {
    return request({
      url: "/stats/meal-renewal-chart",
    });
  };

  const query = useQuery({
    queryKey: ["get-meal-renwal-stats"],
    queryFn: getStats,
  });

  return query;
};

export const useGetNewSignups = () => {
  const getStats = (): Promise<
    AxiosResponse<{ month: string; signups: number }[]>
  > => {
    return request({
      url: "/stats/new-signups",
    });
  };

  const query = useQuery({
    queryKey: ["get-new-signups"],
    queryFn: getStats,
  });

  return query;
};
