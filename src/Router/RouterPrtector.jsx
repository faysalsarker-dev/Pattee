/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../Hook/useAuth";
import Lottie from "lottie-react";
import animetion from './../../public/animetion.json'

const RouterProtector = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
     <div className="h-[80vh] flex justify-center items-center"> <Lottie animationData={animetion} loop={true} /></div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
  return <>{children}</>;
};

export default RouterProtector;
