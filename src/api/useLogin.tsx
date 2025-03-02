import { useMutation } from "@tanstack/react-query";
import { request } from "./baseRequest";
import { AxiosError, AxiosResponse } from "axios";
import { Encrypt } from "../utils/encryption";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { homepageMap } from "../router/homepageMap";

const useLogin = () => {
  const navigate = useNavigate();
  const login = (data: any) => {
    return request({
      url: "/auth/login",
      method: "post",
      data,
    });
  };

  const mutation = useMutation({
    mutationKey: ["login-user"],
    mutationFn: login,
    onSuccess: (res: AxiosResponse) => {
      let {
        message,
        token,
        user: { role },
      } = res.data;
      localStorage.setItem("fitnesstoken", Encrypt(token)!);
      toast(message);
      navigate(homepageMap[role]);
    },
    onError: (err: AxiosError<any>) => {
      if (err.response) {
        toast(err.response.data.message);
      }
    },
  });

  return mutation;
};

export default useLogin;
