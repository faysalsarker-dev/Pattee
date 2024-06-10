import { Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import Logo from "./../assets/img/pngwing.com.png";

export function Footer() {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-200 dark:bg-gray-800 p-8 mt-10">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-gray-200 dark:bg-gray-800 text-center md:justify-between">
        <div className="flex items-center gap-3"> 
          <img src={Logo} alt="logo-ct" className="w-10" />
          <span className="lg:text-3xl font-bold text-2xl">Pattee</span>
        </div>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              isActive ? "border-b-2 border-b-primary font-bold" : ""
            }
          >
            <Typography
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 dark:text-white"
            >
              Home
            </Typography>
          </NavLink>
          <NavLink 
            to="/petlist" 
            className={({ isActive }) =>
              isActive ? "border-b-2 border-b-primary font-bold" : ""
            }
          >
            <Typography
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 dark:text-white"
            >
              Pet List
            </Typography>
          </NavLink>
          <NavLink 
            to="/All-Donation-Campaigns" 
            className={({ isActive }) =>
              isActive ? "border-b-2 border-b-primary font-bold" : ""
            }
          >
            <Typography
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 dark:text-white"
            >
              Donation Campaigns
            </Typography>
          </NavLink>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-400 dark:border-blue-gray-700" />
      <Typography color="blue-gray" className="text-center font-normal dark:text-white">
        &copy; {currentYear} Pattee
      </Typography>
    </footer>
  );
}
