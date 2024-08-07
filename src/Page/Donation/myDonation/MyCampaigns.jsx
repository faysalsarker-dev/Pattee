import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import useMycam from "../../../utility/useMycam";
import { Pagination } from "../../../componenet/Pagination";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import DialogTable from "./DialogTable";

const MyCampaigns = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const count = useMycam();
  const [open, setOpen] = useState(false);
  const [donatorData, setDonatorData] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    if (count) {
      setTotalPages(Math.ceil(count / 10));
    }
  }, [count]);

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ["My-campaigns", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/My-donation-campaigns/${user?.email}?page=${currentPage}&size=${10}`);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (item) => {
      const info = { pause: !item.pause };
      const { data: pauseData } = await axiosSecure.patch(`/update-cam/${item._id}`, info);
      return pauseData;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const onEdit = (item) => {
    navigate(`/user-dashboard/Update-campaigns/${item._id}`);
  };

  const onPause = (item) => {
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
        confirmButtonText: "Yes, Do it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await mutateAsync(item);
          swalWithBootstrapButtons.fire({
            title: "Pause!",
            text: "Your Pause has been updated.",
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

  const onDonator = async (pet) => {
    setLoading(true);
    handleOpen();
    try {
      const { data } = await axiosSecure.get(`/donation-info/${pet._id}`);
      setDonatorData(data);
    } catch (error) {
      console.error("Error fetching donator data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-bold">My added Campaigns</h3>
      <Table data={data} onEdit={onEdit} onPause={onPause} onDonator={onDonator} isLoading={isLoading} />
      {count > 10 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Donator Information</DialogHeader>
        <DialogBody>
          <DialogTable data={donatorData} loading={loading} />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default MyCampaigns;
