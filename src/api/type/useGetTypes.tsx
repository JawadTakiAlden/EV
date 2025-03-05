import { useQuery } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { AxiosResponse } from "axios";
import { MealType } from "../../tables-def/meal-types";

const useGetTypes = () => {
  const getTypes = (): Promise<AxiosResponse<MealType[]>> => {
    return request({
      url: "/admin/types",
    });
  };

  const query = useQuery({
    queryKey: ["get-types"],
    queryFn: getTypes,
  });

  return query;
};

export default useGetTypes;
