import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxiosCommon";
import useAuth from "./useAuth";


const useAdmin = () => {
const axiosCommon = useAxios()
const {user}=useAuth()


    const { data={} , isLoading } = useQuery({
        queryKey: ["pet", user?.email],
        queryFn: async () => {
          const { data } = await axiosCommon.get(`/check-admin/${user?.email}`);
          return data;
        },
      });
      const role = data?.role ==='admin'
  return role
};

export default useAdmin;