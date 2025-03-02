import { useMutation, useQuery } from "@tanstack/react-query";
import { request, ServerResponse } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const useGetPrivacy = () => {
  const getPrivacy = () => {
    return request({
      url: "/info/privacy-policy",
    });
  };

  const query = useQuery({
    queryKey: ["get-privacy"],
    queryFn: getPrivacy,
  });

  return query;
};

export const useUpdatePrivacy = () => {
  const updatePrivacy = (data: any) => {
    return request({
      url: "/info/privacy-policy",
      method: "put",
      data,
    });
  };

  const mutation = useMutation({
    mutationKey: ["update-privacy"],
    mutationFn: updatePrivacy,
    onSuccess: (res: AxiosResponse<ServerResponse<any>>) => {
      toast(res.data.message);
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err.response?.data.message);
    },
  });

  return mutation;
};

export const useUpdateTerms = () => {
  const updatePrivacy = (data: any) => {
    return request({
      url: "/info/terms-and-conditions",
      method: "put",
      data,
    });
  };

  const mutation = useMutation({
    mutationKey: ["update-privacy-and-conditions"],
    mutationFn: updatePrivacy,
    onSuccess: (res: AxiosResponse<ServerResponse<any>>) => {
      toast(res.data.message);
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err.response?.data.message);
    },
  });

  return mutation;
};

export const useGetTerms = () => {
  const getPrivacy = () => {
    return request({
      url: "/info/terms-and-conditions",
    });
  };

  const query = useQuery({
    queryKey: ["get-terms-and-conditions"],
    queryFn: getPrivacy,
  });

  return query;
};
