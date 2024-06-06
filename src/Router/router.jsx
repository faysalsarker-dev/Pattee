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
import Errpage from "../Page/404/Errpage";
import Mypets from "../Page/Dashboard/mypet/Mypets";
import UpdatePet from "../Page/Dashboard/PetUpdate/UpdatePet";
import Category from "../Page/category/Category";
import CreateDonation from "../Page/Donation/CreateDonation";




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
        path: "/category/:cetegory",
        element: <Category></Category>,
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
        path:'my-pets',
        element: <Mypets></Mypets>,
      },
      {
        path:'Update-pet/:id',
        element:<UpdatePet />,
      },
      {
        path: "Create-Donation-Campaigns",
        element: <CreateDonation/>,
      },
     
    ],
  },
]);

export default router;
