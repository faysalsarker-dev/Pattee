import axios from "axios";


const axiosCommon = axios.create({
  
    //  baseURL: "https://12agt-server.vercel.app/",
 baseURL: "http://localhost:5000/",
  
});

const useAxiosSecure = () => {

    
    return axiosCommon;
};

export default useAxiosSecure;
