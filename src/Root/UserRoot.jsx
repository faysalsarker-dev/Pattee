import { Outlet } from "react-router-dom";
import { UserDashBoard } from "../Page/Dashboard/UserDashboard";

const UserRoot = () => {
    return (
        <div className="flex gap-2">
            <UserDashBoard></UserDashBoard>
           <div className="w-full py-5"> <Outlet></Outlet></div>
        </div>
    );
};

export default UserRoot;