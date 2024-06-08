import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import DonationTable from "./DonationTable";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AllDonations = () => {
    const axiosSecure = useAxiosSecure();
const navigate =useNavigate()
    const { data = [] ,refetch} = useQuery({
      queryKey: ["users-list"],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/all-donation`);
        return data;
      },
    });

    const onEdit = (pet)=>{
        if (pet && pet._id) {
           
            navigate(`/user-dashboard/Update-campaigns/${pet._id}`);
          }

    }
    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
          const { data: deletedData } = await axiosSecure.delete(`/delete-campaign/${id}`);
          return deletedData;
        },
        onSuccess: () => {
          refetch();
        },
        onError:(err)=>{
            console.log(err);
        }
      });




    const onDelete=(pet)=>{
console.log(pet);
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
              console.log();
        
              await mutateAsync(pet._id);
        
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
            <DonationTable data={data} onEdit={onEdit} onDelete={onDelete} />
        </div>
    );
};

export default AllDonations;