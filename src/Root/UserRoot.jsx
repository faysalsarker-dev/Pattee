import { Outlet } from "react-router-dom";
import { UserDashBoard } from "../Page/Dashboard/UserDashboard";

const UserRoot = () => {
  return (
    <div className="flex gap-2">
      <UserDashBoard />
      <div className="w-full py-3">
        <Outlet />
      </div>
    </div>
  );
};

export default UserRoot;
