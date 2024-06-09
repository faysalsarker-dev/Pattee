import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import DonationTable from "./DonationTable";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AllDonations = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ["users-list"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-donation`);
            return data;
        },
    });

    const onEdit = (pet) => {
        if (pet && pet._id) {
            navigate(`/user-dashboard/Update-campaigns/${pet._id}`);
        }
    };

    const { mutateAsync: deleteCampaign } = useMutation({
        mutationFn: async (id) => {
            const { data: deletedData } = await axiosSecure.delete(`/delete-campaign/${id}`);
            return deletedData;
        },
        onSuccess: () => {
            refetch();
        },
        onError: (err) => {
            console.log(err);
        }
    });

    const onDelete = (pet) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "p-2 rounded-lg bg-primary text-white ml-2",
                cancelButton: "p-2 rounded-lg border",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteCampaign(pet._id);
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

    const { mutateAsync: mutatePause } = useMutation({
        mutationFn: async (item) => {
            const info = { pause: !item.pause }
            const { data: pauseData } = await axiosSecure.patch(`/update-cam/${item._id}`, info);
            return pauseData;
        },
        onSuccess: () => {
          refetch();
        },
    });

    const onPause = (pet) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "p-2 rounded-lg bg-primary text-white ml-2",
                cancelButton: "p-2 rounded-lg border",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, pause it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await mutatePause(pet);
                swalWithBootstrapButtons.fire({
                    title: "Paused!",
                    text: "The campaign has been paused.",
                    icon: "success",
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "The campaign remains active.",
                    icon: "error",
                });
            }
        });
    };

    return (
        <div>
            <DonationTable isLoading={isLoading} data={data} onEdit={onEdit} onDelete={onDelete} onPause={onPause} />
        </div>
    );
};

export default AllDonations;
