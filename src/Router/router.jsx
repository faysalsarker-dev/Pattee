import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Page/Home/Home";
import { Register } from "../Page/login-register/Register";
import Login from "../Page/login-register/Login";
import Petlist from "../Page/petList/Petlist";
import PetDetails from "../Page/PetDetails/PetDetails";
import UserRoot from "../Root/UserRoot";
import RouterProtector from "./RouterPrtector";
import Addpet from "../Page/Dashboard/Addpet";
import Errpage from "../Page/404/Errpage";
import Mypets from "../Page/Dashboard/mypet/Mypets";
import UpdatePet from "../Page/Dashboard/PetUpdate/UpdatePet";
import Category from "../Page/category/Category";
import CreateDonation from "../Page/Donation/CreateDonation";
import AllCampaigns from "../Page/Donation-campaigns/AllCampaigns";
import Details from "../Page/Donation-campaigns/Details";
import MyCampaigns from "../Page/Donation/myDonation/MyCampaigns";
import UpdateCam from "../Page/Dashboard/PetUpdate/UpdateCam";
import UsersList from "./../Page/Admin/UsersList";
import Allpet from "../Page/Admin/Allpet";
import AllDonations from "../Page/Admin/AllDonations";
import Request from "../Page/Adoption-request/Request";
import AdminProtection from "./AdminProtection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Errpage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/petlist",
        element: <Petlist />,
      },
      {
        path: "/category/:cetegory",
        element: <Category />,
      },
      {
        path: "/pet/:id",
        element: <PetDetails />,
      },
      {
        path: "/pet/:id",
        element: <PetDetails />,
      },

      {
        path: "/All-Donation-Campaigns",
        element: <AllCampaigns />,
      },
      {
        path: "/Donation-details/:id",
        element: <Details />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: (
      <RouterProtector>
        <UserRoot />
      </RouterProtector>
    ),
    children: [
      {
        index: true,
        element: (
          <RouterProtector>
            <Addpet />
          </RouterProtector>
        ),
      },
      {
        path: "my-pets",
        element: (
          <RouterProtector>
            <Mypets />
          </RouterProtector>
        ),
      },
      {
        path: "Update-pet/:id",
        element: (
          <RouterProtector>
            <UpdatePet />
          </RouterProtector>
        ),
      },
      {
        path: "Create-Donation-Campaigns",
        element: (
          <RouterProtector>
            <CreateDonation />
          </RouterProtector>
        ),
      },
      {
        path: "My-campaigns",
        element: (
          <RouterProtector>
            <MyCampaigns />
          </RouterProtector>
        ),
      },
      {
        path: "Update-campaigns/:id",
        element: (
          <RouterProtector>
            <UpdateCam />
          </RouterProtector>
        ),
      },
      {
        path: "Adoption-request",
        element: (
          <RouterProtector>
            <Request />
          </RouterProtector>
        ),
      },
      {
        path: "Users-list",
        element: (
          <AdminProtection>
            <UsersList />
          </AdminProtection>
        ),
      },
      {
        path: "All-pets",
        element: (
          <AdminProtection>
            <Allpet />
          </AdminProtection>
        ),
      },
      {
        path: "All-Donation",
        element: (
          <AdminProtection>
            <AllDonations />
          </AdminProtection>
        ),
      },
    ],
  },
]);

export default router;
