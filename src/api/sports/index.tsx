import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request, ServerResponse } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Sport } from "../../tables-def/sport";

export const useGetSprots = () => {
  const getSprots = (): Promise<AxiosResponse<{ sports: Sport[] }>> => {
    return request({
      url: "/admin/sports",
    });
  };

  const query = useQuery({
    queryKey: ["get-sports"],
    queryFn: getSprots,
  });

  return query;
};

export const useCreateSport = () => {
  const createSport = (data: any) => {
    return request({
      url: "/admin/sports",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-sport"],
    mutationFn: createSport,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-sports"],
      });
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err.response?.data.message);
    },
  });
  return mutation;
};

export const useDeleteSport = () => {
  const deleteSport = (id: number) => {
    return request({
      url: `/admin/sports/${id}`,
      method: "delete",
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-sport"],
    mutationFn: deleteSport,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-sports"],
      });
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err.response?.data.message);
    },
  });
  return mutation;
};

export const useUpdateSport = () => {
  const updateSport = ({ data, id }: { data: any; id: number }) => {
    return request({
      url: `/admin/sports/${id}`,
      method: "put",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-sport"],
    mutationFn: updateSport,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-sports"],
      });
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err.response?.data.message);
    },
  });
  return mutation;
};
