import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../Hook/useAxiosSecure";
import UsersTable from "./UsersTable";
import Swal from "sweetalert2";

const UsersList = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [] ,refetch} = useQuery({
    queryKey: ["users-list"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users`);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (email) => {
        const info ={role:'admin'}
      const { data: upadatedData } = await axiosSecure.patch(`/make-Admin/${email}`,info);
      return upadatedData;
    },
    onSuccess: () => {
      refetch();
    },
  });
  





const makeAdmin =(user)=>{
    console.log(user);
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
          confirmButtonText: "Yes, Make admin",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then(async (result) => {
          console.log();
  
          await mutateAsync(user.email);
  
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




  return (<>
  
  
  
  
  <div>
           <UsersTable data={data} makeAdmin={makeAdmin}/>
        </div>
  
  </>)
};

export default UsersList;
