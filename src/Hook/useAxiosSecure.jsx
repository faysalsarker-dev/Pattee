import axios from "axios";


const axiosCommon = axios.create({
  
    // baseURL: "https://server-teal-phi.vercel.app",
baseURL: "http://localhost:5000/",
  
});

const useAxiosSecure = () => {

    
    return axiosCommon;
};

export default useAxiosSecure;
