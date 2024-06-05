// src/App.js

import { useQuery } from "@tanstack/react-query";
import MyTable from "./Myadd";
import useAxiosSecure from './../../../Hook/useAxiosSecure';
import useAuth from './../../../Hook/useAuth';







const Mypets = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const { data=[], isLoading, error} = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
          
          const {data : info} = await axiosSecure.get(`/my-pets/${user?.email}`);
          return info;
        },
       
      });


console.log(data);

  return (
    <div className="p-4 overflow-scroll">
     <MyTable data={data}></MyTable>
    </div>
  );
};

export default Mypets;
