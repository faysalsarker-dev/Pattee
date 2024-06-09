import useAxiosSecure from '../Hook/useAxiosSecure';
import useAuth from '../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

const useReq = () => {
  const [count, setCount] = useState(0);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data} = useQuery({
    queryKey: [user?.email, 'Adoptetion-req'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-pet-adoptetion/${user?.email}`);
      return data;
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


  return  count 
};

export default useReq;
