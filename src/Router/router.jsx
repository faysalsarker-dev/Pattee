import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Page/Home/Home";
import { Register } from "../Page/login-register/Register";
import Login from "../Page/login-register/Login";
import Petlist from "../Page/petList/Petlist";
import PetDetails from "../Page/PetDetails/PetDetails";
import UserRoot from "../Root/UserRoot";
import RouterProtector from "./RouterPrtector";
import  Addpet  from "../Page/Dashboard/Addpet";
import Myaddpet from "../Page/Dashboard/mypet/Myaddpet";
import Errpage from "../Page/404/Errpage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<Errpage></Errpage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/petlist",
        element: <Petlist></Petlist>,
      },
      {
        path: "/pet/:id",
        element: <PetDetails></PetDetails>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: (
      <RouterProtector>
        <UserRoot></UserRoot>
      </RouterProtector>
    ),
    children: [
      {
        index:true,
        element: <Addpet></Addpet>,
      },
      {
        index:'my-added-pet',
        element: <Myaddpet></Myaddpet>,
      },
    ],
  },
]);

export default router;
