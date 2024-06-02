/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../Hook/useAuth";

const RouterProtector = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        loading...
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
  return <>{children}</>;
};

export default RouterProtector;
