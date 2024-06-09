import { useQuery } from "@tanstack/react-query";


import useAxiosSecure from "../Hook/useAxiosSecure";
import useAuth from "../Hook/useAuth";
import { useEffect, useState } from "react";


const useMypet = () => {
  const [count, setCount] = useState(0);
const axiosSecure = useAxiosSecure()
const {user}=useAuth()
    const { data} = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/my-total-pet/${user?.email}`);
          return data.count;
        },
        onSuccess: (data) => {
          setCount(data.count);
        },
    
      });

      useEffect(() => {
        if (data) {
          setCount(data.count);
        }
      }, [data]);
    
    return count
};

export default useMypet;