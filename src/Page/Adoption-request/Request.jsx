import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "./../../Hook/useAxiosSecure";
import ReqTable from "./ReqTable";
import useReq from "../../utility/useReq";
import { useEffect, useState } from "react";
import { Pagination } from "../../componenet/Pagination";
import Swal from "sweetalert2";

const Request = () => {
  const { user } = useAuth();
  const count = useReq();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (count) {
      setTotalPages(Math.ceil(count / 10));
    }
  }, [count]);

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ['Adoptetion-request', user?.email, currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-pets-req/${user?.email}?page=${currentPage}&size=10`
      );
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data: updatedData } = await axiosSecure.patch(`/my-pets-req-handle/${id}`, { status });
      return updatedData;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleAction = (pet, status) => {
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
        confirmButtonText: "Yes, do it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await mutateAsync({ id: pet._id, status });
          swalWithBootstrapButtons.fire({
            title: "Success!",
            text: `Request has been ${status}.`,
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Action was cancelled.",
            icon: "error",
          });
        }
      });
  };

  const onAccept = (pet) => handleAction(pet, "accept");
  const onReject = (pet) => handleAction(pet, "reject");

  return (
    <div className="h-[100vh]">
      <h3 className="text-3xl font-bold">Adoption request</h3>
      <ReqTable data={data} isLoading={isLoading} onReject={onReject} onAccept={onAccept} />
      {count > 10 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Request;
