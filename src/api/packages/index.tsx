import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request, ServerResponse } from "../baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../providers/AuthProvider";
import { useNavigate, useParams } from "react-router";
import { Package } from "../../tables-def/packages";

export const useGetPackages = () => {
  const getPackages = (): Promise<AxiosResponse<Package[]>> => {
    return request({
      url: "/admin/packages",
    });
  };

  const query = useQuery({
    queryKey: ["get-packages"],
    queryFn: getPackages,
  });

  return query;
};

export const useGetWorkoutOfPackageAndDay = (
  packageId: string | number | undefined,
  day: string | undefined
) => {
  const getWorkoutOfPackageAndDay = () => {
    return request({
      url: `/coach/group-workout?package_id=${packageId}&date=${day}`,
    });
  };

  const query = useQuery({
    queryKey: [`get-workouts-of-${packageId}-${day}`],
    queryFn: getWorkoutOfPackageAndDay,
    enabled: !!packageId && !!day,
  });

  return query;
};

export const useCreatePackages = () => {
  const { base } = useAuthContext();
  const navigate = useNavigate();
  const createPackages = (data: any) => {
    return request({
      url: "/admin/packages",
      method: "post",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-packages"],
    mutationFn: createPackages,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-packages"],
      });
      navigate(`/${base}/dashboard/packages/${res.data.package.id}`);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};

export const useUpdatePackage = () => {
  const { base } = useAuthContext();
  const { packageId } = useParams();
  const navigate = useNavigate();
  const updatePackages = (data: any) => {
    return request({
      url: `/admin/packages/${packageId}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-packages"],
    mutationFn: updatePackages,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`show-package-${packageId}`],
      });
      navigate(`/${base}/dashboard/packages/${res.data.id}`);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};

export const useShowPackage = () => {
  const { packageId } = useParams();
  const showPackage = () => {
    return request({
      url: `/admin/packages/${packageId}`,
    });
  };

  const query = useQuery({
    queryKey: [`show-package-${packageId}`],
    queryFn: showPackage,
  });

  return query;
};

export const useDeletePackage = () => {
  const { packageId } = useParams();
  const { base } = useAuthContext();
  const navigate = useNavigate();
  const deletePackage = () => {
    return request({
      url: `/admin/packages/${packageId}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-package"],
    mutationFn: deletePackage,
    onSuccess: (res: AxiosResponse) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-packages"],
      });
      navigate(`/${base}/dashboard/packages`);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};

// export const useGetPricing = () => {
//   const getPricing = () => {
//     return request({
//       url: "/admin/pricing",
//     });
//   };

//   const query = useQuery({
//     queryKey: ["get-pricing"],
//     queryFn: getPricing,
//   });

//   return query;
// };

export const useCreatePrice = () => {
  const createPrice = (data: any) => {
    return request({
      url: "/admin/pricing",
      method: "post",
      data,
    });
  };
  const { packageId } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-package"],
    mutationFn: createPrice,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`show-package-${packageId}`],
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};

export const useUpdatePrice = () => {
  const updatePrice = ({ data, id }: { data: any; id: number }) => {
    return request({
      url: `/admin/pricing/${id}`,
      method: "put",
      data,
    });
  };
  const { packageId } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-package"],
    mutationFn: updatePrice,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`show-package-${packageId}`],
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};

export const useDeletePrice = () => {
  const deletePrice = (id: number) => {
    return request({
      url: `/admin/pricing/${id}`,
      method: "delete",
    });
  };

  const { packageId } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-package"],
    mutationFn: deletePrice,
    onSuccess: (res: AxiosResponse<ServerResponse>) => {
      toast(res.data.message);
      queryClient.refetchQueries({
        queryKey: [`show-package-${packageId}`],
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  return mutation;
};
