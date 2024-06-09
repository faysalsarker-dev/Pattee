import { useQuery } from "@tanstack/react-query";


import useAxiosSecure from "../Hook/useAxiosSecure";
import useAuth from "../Hook/useAuth";


const useMypet = () => {
const axiosSecure = useAxiosSecure()
const {user}=useAuth()
    const { data} = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/my-total-pet/${user?.email}`);
          return data.count;
        },
    
      });
      console.log(data);
    return data
};

export default useMypet;