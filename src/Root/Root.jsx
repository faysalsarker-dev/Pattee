import { Outlet } from "react-router-dom";
import { NavbarSimple } from "../componenet/NavberSimple";
import { Footer } from "../componenet/Footer";

const Root = () => {
  return (
    <div>
      <NavbarSimple />
      <div className="min-h-[calc(100vh-212px)] max-w-6xl mx-auto px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
