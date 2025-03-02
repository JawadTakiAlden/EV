import { useQuery } from "@tanstack/react-query";
import { request } from "./baseRequest";

const useGetMyProfile = () => {
  const getMyProfile = () => {
    return request({
      url: "/profile/me",
    });
  };

  const query = useQuery({
    queryKey: ["get-me"],
    queryFn: getMyProfile,
  });

  return query;
};

export default useGetMyProfile;
