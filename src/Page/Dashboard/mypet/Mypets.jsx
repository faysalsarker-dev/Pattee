import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "./../../../Hook/useAxiosSecure";
import useAuth from "./../../../Hook/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MyTable from "./Myadd";
import { useNavigate } from "react-router-dom";

const Mypets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const { data: info=[] } = await axiosSecure.get(`/my-pets/${user?.email}`);
      return info;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data: deletedData } = await axiosSecure.delete(`/my-pets-delete/${id}`);
      return deletedData;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleEdit = (pet) => {
    console.log("Edit pet:", pet);
    // Ensure that pet._id is valid
    if (pet && pet._id) {
      // Use backticks for template literals
      navigate(`/user-dashboard/Update-pet/${pet._id}`);
    }
  };

  const handleDelete = (pet) => {
    console.log("Delete pet:", pet);
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
  };

  if (isLoading) {
    return (
      <div className="p-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="skeleton-row flex justify-between my-2">
            <Skeleton className="w-16 h-16" />
            <Skeleton className="w-32 h-16" />
            <Skeleton className="w-32 h-16" />
            <Skeleton className="w-32 h-16" />
            <Skeleton className="w-32 h-16" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="p-4">Error loading pets data...</div>;
  }

  return (
    <div className="-mt-10 h-[100vh]">
      <MyTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Mypets;
