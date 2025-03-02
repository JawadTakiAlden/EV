import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request, ServerResponse } from "../baseRequest";
import { MealIngreadiant } from "../../tables-def/meal-ingrediant";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const useGetIngredients = () => {
  const getIngredient = (): Promise<AxiosResponse<MealIngreadiant[]>> => {
    return request({
      url: "/admin/ingredients",
    });
  };

  const query = useQuery({
    queryKey: ["get-ingredients"],
    queryFn: getIngredient,
  });

  return query;
};

export const useCreateIngredient = () => {
  const createIngredient = (data: any) => {
    return request({
      url: "/admin/ingredients",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-ingredient"],
    mutationFn: createIngredient,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-ingredients"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return mutation;
};

export const useUpdateIngredientStock = () => {
  const updateStockIngredient = (data: any) => {
    return request({
      url: "/kitchen/add-stock",
      method: "post",
      data,
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-stock-ingredient"],
    mutationFn: updateStockIngredient,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-ingredients"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return mutation;
};

export const useDeleteIngredient = () => {
  const deleteIngredient = (id: number) => {
    return request({
      url: `/admin/ingredients/${id}`,
      method: "delete",
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-ingredient"],
    mutationFn: deleteIngredient,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-ingredients"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return mutation;
};

export const useUpdateIngredient = () => {
  const updateIngredient = ({ data, id }: { data: any; id: number }) => {
    return request({
      url: `/admin/ingredients/${id}`,
      method: "put",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-ingredient"],
    mutationFn: updateIngredient,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-ingredients"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return mutation;
};
