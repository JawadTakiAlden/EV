import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request, ServerResponse } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Faq } from "../../tables-def/faq";

export const useGetFaqs = () => {
  const getFaqs = (): Promise<AxiosResponse<{ faqs: Faq[] }>> => {
    return request({
      url: "/info/faqs",
    });
  };

  const query = useQuery({
    queryKey: ["get-faqs"],
    queryFn: getFaqs,
  });

  return query;
};

export const useCreateFaq = () => {
  const createFaq = (data: Partial<Faq>) => {
    return request({
      url: "/info/faqs",
      method: "post",
      data,
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-faq"],
    mutationFn: createFaq,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-faqs"],
      });
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err.response?.data.message);
    },
  });
  return mutation;
};

export const useDeleteFaq = () => {
  const deleteFaq = (id: number) => {
    return request({
      url: `/info/faqs/${id}`,
      method: "delete",
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-faq"],
    mutationFn: deleteFaq,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-faqs"],
      });
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err.response?.data.message);
    },
  });
  return mutation;
};

export const useUpdateFaq = () => {
  const updateFaq = ({ data, id }: { data: Partial<Faq>; id: number }) => {
    return request({
      url: `/info/faqs/${id}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-faq"],
    mutationFn: updateFaq,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-faqs"],
      });
    },
    onError: (err: AxiosError<ServerResponse<any>>) => {
      toast(err.response?.data.message);
    },
  });
  return mutation;
};
