import { Outlet } from "react-router-dom";
import { NavbarSimple } from "../componenet/NavberSimple";


const Root = () => {
    return (
        <div>
            <NavbarSimple></NavbarSimple>
           <div className="min-h-[calc(100vh-212px)] max-w-6xl mx-auto px-4"> <Outlet></Outlet></div>
        </div>
    );
};

export default Root;