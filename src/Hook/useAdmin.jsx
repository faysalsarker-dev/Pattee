import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxiosCommon";
import useAuth from "./useAuth";
import Skeleton from "react-loading-skeleton";

const useAdmin = () => {
  const axiosCommon = useAxios();
  const { user } = useAuth();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["pet", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/check-admin/${user?.email}`);
      return data;
    },
  });
  const role = data?.role === "admin";

  if (isLoading) {
    return (
      <div className="skeleton-loader">
        <div className="navbar">
          <Skeleton height={50} width={200} />
        </div>

        <div className="main-content">
          <Skeleton count={10} height={50} />
        </div>
      </div>
    );
  }
  return role;
};

export default useAdmin;
