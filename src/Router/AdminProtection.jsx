/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../Hook/useAuth";

import useAdmin from "../Hook/useAdmin";
import Lottie from "lottie-react";
import animetion from './../../public/animetion.json'
const AdminProtection = ({ children }) => {
    const isAdmin=useAdmin()
  const { user, loading } = useAuth();
  const location = useLocation();



  if (loading) {
    return (
     <div className="h-[80vh] flex justify-center items-center"> <Lottie animationData={animetion} loop={true} /></div>
    );
  }


  if (!user || !isAdmin) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }


  
     return <>{children}</>;
  

  
 
};

export default AdminProtection;
