
import useAxiosSecure from '../Hook/useAxiosSecure';
import useAuth from '../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';

const useMycam = () => {
    const axiosSecure = useAxiosSecure()
const {user}=useAuth()
    const { data} = useQuery({
        queryKey: [user?.email,'my-cam-count'],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/My-campaigns-count/${user?.email}`);
          return data.count;
        },
    
      });

console.log(data);



    return data
};

export default useMycam;