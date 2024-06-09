import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import PetTable from "./PetsTable";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Allpet = () => {
const navigate= useNavigate()
    const axiosSecure = useAxiosSecure();

    const { data = [] ,refetch,isLoading} = useQuery({
      queryKey: ["users-list"],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/all-pets`);
        return data;
      },
    });

    const onEdit=(pet)=>{
        if (pet && pet._id) {
           
            navigate(`/user-dashboard/Update-pet/${pet._id}`);
          }
    }
    
    const { mutateAsync: mutateStatus } = useMutation({
        mutationFn: async (pet) => {
            const newData = !pet.adopted;
            const info = {
                image: pet.image,
                name: pet.name,
                age: pet.age,
                location: pet.location,
                short_des: pet.short_des,
                long_des: pet.long_des,
                category: pet.category,
                email: pet.email,
                date: pet.date,
                adopted: newData
            };
            const { data } = await axiosSecure.patch(`/pet-adopt/${pet._id}`, info);
            return data;
        },
        onSuccess: () => {
            refetch();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    








const onStatus =(pet)=>{
    console.log('onStatus',pet);
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
    
          await mutateStatus(pet._id);
    
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







    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
          const { data: deletedData } = await axiosSecure.delete(`/my-pets-delete/${id}`);
          return deletedData;
        },
        onSuccess: () => {
          refetch();
        },
      });






const onDelete = (pet)=>{


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
          <h3 className="text-3xl font-extrabold">All pets</h3>
            <PetTable data={data} onEdit={onEdit} onDelete={onDelete} isLoading={isLoading} onStatus={onStatus}/>
        </div>
    );
};

export default Allpet;