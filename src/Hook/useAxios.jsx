import axios from "axios";


const axiosSecure = axios.create({
  
    // baseURL: "https://server-teal-phi.vercel.app",
baseURL: "http://localhost:5000/",
    withCredentials: true
});

const useAxios = () => {

    
    return axiosSecure;
};

export default useAxios;
