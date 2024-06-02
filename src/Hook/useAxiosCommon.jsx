import axios from "axios";


const axiosCommon = axios.create({
  
    // baseURL: "https://server-teal-phi.vercel.app",
baseURL: "http://localhost:5000/",
  
});

const useAxios = () => {

    
    return axiosCommon;
};

export default useAxios;
