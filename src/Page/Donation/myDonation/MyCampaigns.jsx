import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";

import  Table  from "./Table";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";



const MyCampaigns = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { data = [] } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/My-donation-campaigns/${user?.email}`);
          return data;
        },
      });
      console.log(data);


      const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
          const info = {pause:true}
          const { data: pauseData } = await axiosSecure.patch(`/update-cam/${id}`,info);
          return pauseData;
        },
        onSuccess: () => {
        toast.success('pause')
        },
      });







      const onEdit = (item )=>{
        console.log('onEdit',item);
        navigate(`/user-dashboard/Update-campaigns/${item._id}`)
      }
      const onPause = (item )=>{
        console.log('onPause',item);
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "p-2 rounded-lg bg-primary text-white ml-2",
            cancelButton: "p-2 rounded-lg border",
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
          })
          .then(async (result) => {
       
    
            await mutateAsync(item._id);
    
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error",
              });
            }
          });
       
      }
    return (
        <div>
            <Table data={data} onEdit={onEdit} onPause={onPause}/>
        </div>
    );
};

export default MyCampaigns;