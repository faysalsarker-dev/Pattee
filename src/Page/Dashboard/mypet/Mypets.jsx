import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import useAuth from "./../../../Hook/useAuth";

import "react-loading-skeleton/dist/skeleton.css";
import MyTable from "./Myadd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useEffect
import { Pagination } from "../../../componenet/Pagination";
import useMypet from "../../../utility/useMypet";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const Mypets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const count = useMypet();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (count) {
      setTotalPages(Math.ceil(count / 10));
    }
  }, [count]);

  console.log(totalPages);

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["my-added-pet", user?.email, currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-pets/${user?.email}?page=${currentPage}&size=${10}`
      );
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data: deletedData } = await axiosSecure.delete(
        `/my-pets-delete/${id}`
      );
      return deletedData;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleEdit = (pet) => {
    console.log("Edit pet:", pet);

    if (pet && pet._id) {
      navigate(`/user-dashboard/Update-pet/${pet._id}`);
    }
  };

  const handleDelete = (pet) => {
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
        if (result.isConfirmed) {
          await mutateAsync(pet._id);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const { mutateAsync: petStatus } = useMutation({
    mutationFn: async (id) => {
      const info = {
        adopted: true
      };
      const { data: formdata } = await axiosSecure.patch(`/pet-adopt/${id}`, info);
      return formdata;
    },
    onSuccess:()=>{
      refetch();
    },
    onError: (error) => {
      console.error("Error updating pet status:", error);
    }
  });



  const { mutateAsync: adopted } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.post(`/adopted`, info);
      return data;
    },
    onSuccess:() => {
   
      
    },
  });
  const onAdopt = (pet) => {
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
        text: "You won't Adopt youre own added pets",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Adopt it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        const info = {
          pet_id: pet._id,
          pet_name: pet.name,
          pet_image: pet.image,
          donetor_email: pet.email,
          user_name: user?.displayName,
          email: user?.email,
          status: "pending",
        };

        if (result.isConfirmed) {
          await adopted(info);
          await petStatus(pet._id)
          swalWithBootstrapButtons.fire({
            title: "Adopted!",
            text: "Your file has Adopted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  if (error) {
    return <div className="p-4">Error loading pets data...</div>;
  }

  return (
    <>
      <div className=" h-[100vh]">
        <h3 className="text-3xl font-bold">My added pets</h3>
        <MyTable
          data={data}
          onAdopt={onAdopt}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
        {count > 10 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default Mypets;
