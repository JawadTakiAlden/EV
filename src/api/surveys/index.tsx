import { useNavigate, useParams } from "react-router";
import { request, ServerResponse } from "../baseRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { Survey } from "../../tables-def/survey";
import { SurveyFormValue } from "../../pages/Survey/components/SurveyForm";
import { toast } from "react-toastify";
import { useAuthContext } from "../../providers/AuthProvider";

export const useGetSurveys = () => {
  const { packageId } = useParams();
  const getSurveys = (): Promise<AxiosResponse<Survey[]>> => {
    return request({
      url: "/admin/package-survey",
      params: {
        package_id: packageId,
      },
    });
  };

  const query = useQuery({
    queryKey: [`get-surveys-of-package-${packageId}`],
    queryFn: getSurveys,
  });

  return query;
};

export const useCreateSurvey = () => {
  const createSurvey = (data: SurveyFormValue) => {
    return request({
      url: `/admin/surveys`,
      method: "post",
      data,
    });
  };

  const queryClient = useQueryClient();
  const { packageId } = useParams();
  const mutation = useMutation({
    mutationKey: ["create-new-survey"],
    mutationFn: createSurvey,
    onSuccess: (res: AxiosResponse<ServerResponse<any>>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`get-surveys-of-package-${packageId}`],
      });
    },
    onError: (err: AxiosError<ServerResponse>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};

export const useUpdateSurvey = () => {
  const { surveyId } = useParams();
  const updateSurvey = (data: SurveyFormValue) => {
    return request({
      url: `/admin/surveys/${surveyId}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();
  const { packageId } = useParams();
  const mutation = useMutation({
    mutationKey: ["update-survey"],
    mutationFn: updateSurvey,
    onSuccess: (res: AxiosResponse<ServerResponse<any>>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`get-surveys-of-package-${packageId}`],
      });
    },
    onError: (err: AxiosError<ServerResponse>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};

export const useDeleteSurvey = (withRedirect: boolean = false) => {
  const deleteSurvey = (surveyId: number) => {
    return request({
      url: `/admin/surveys/${surveyId}`,
      method: "delete",
    });
  };
  const queryClient = useQueryClient();
  const { packageId } = useParams();
  const { base } = useAuthContext();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["delete-new-survey"],
    mutationFn: deleteSurvey,
    onSuccess: (res: AxiosResponse<ServerResponse<any>>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`get-surveys-of-package-${packageId}`],
      });
      if (withRedirect) {
        navigate(`/${base}/dashboard/packages/${packageId}`);
      }
    },
    onError: (err: AxiosError<ServerResponse>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};

export const useShowSurvey = () => {
  const { surveyId } = useParams();
  const showSurvey = (): Promise<AxiosResponse<Survey[]>> => {
    return request({
      url: `/admin/surveys/${surveyId}`,
    });
  };

  const query = useQuery({
    queryKey: [`show-survey-${surveyId}`],
    queryFn: showSurvey,
  });

  return query;
};

export const useCreateQuestion = () => {
  const createQuestion = (data: any) => {
    return request({
      url: "/admin/questions",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };
  const queryClient = useQueryClient();
  const { surveyId } = useParams();
  const mutation = useMutation({
    mutationKey: ["create-question"],
    mutationFn: createQuestion,
    onSuccess: (res: AxiosResponse<ServerResponse<any>>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`show-survey-${surveyId}`],
      });
    },
    onError: (err: AxiosError<ServerResponse>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};

export const useUpdateQuestion = () => {
  const updateQuestion = ({ data, id }: { data: any; id: number }) => {
    return request({
      url: `/admin/questions/${id}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();
  const { surveyId } = useParams();
  const mutation = useMutation({
    mutationKey: ["update-question"],
    mutationFn: updateQuestion,

    onSuccess: (res: AxiosResponse<ServerResponse<any>>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`show-survey-${surveyId}`],
      });
    },
    onError: (err: AxiosError<ServerResponse>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};

export const useDeleteQuestion = () => {
  const deleteQuestion = (questionId: number) => {
    return request({
      url: `/admin/questions/${questionId}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const { surveyId } = useParams();
  const mutation = useMutation({
    mutationKey: ["delete-question"],
    mutationFn: deleteQuestion,
    onSuccess: (res: AxiosResponse<ServerResponse<any>>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`show-survey-${surveyId}`],
      });
    },
    onError: (err: AxiosError<ServerResponse>) => {
      toast(err?.response?.data.message);
    },
  });

  return mutation;
};
