import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxiosCommon";
import useAuth from "../../Hook/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useForm } from "react-hook-form";
import useAxiosSecure from "./../../Hook/useAxiosSecure";
import toast from "react-hot-toast";

const PetDetails = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosCommon = useAxios();
  const { id } = useParams();
  const {
    register,
    handleSubmit: handleFormSubmit,

    reset,
  } = useForm();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/petDetails/${id}`);
      return data;
    },
  });

  const { image, name, age, location, short_des, long_des, category, email, date } = data;

  const { mutateAsync } = useMutation({
    mutationFn: async (info) => {
      const { data: formdata } = await axiosSecure.post("/adopted", info);
      return formdata;
    },
    onSuccess: async () => {
      toast.success("Pet adopted successfully");
      reset();
      await petStatus();
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error adding pet:", error);
      toast.error("Error adding pet. Please try again.");
    },
  });

  const { mutateAsync: petStatus } = useMutation({
    mutationFn: async () => {
      const info = {
        image, name, age, location, short_des, long_des, category, email, date, adopted: true
      };
      const { data: formdata } = await axiosSecure.patch(`/pet-adopt/${id}`, info);
      return formdata;
    },
    onError: (error) => {
      console.error("Error updating pet status:", error);
    }
  });

  const onSubmit = async (formData) => {
    const info = {
      pet_id: id,
      pet_name: name,
      pet_image: image,
      address: formData.address,
      number: formData.number,
      email: user?.email,
    };
    console.log(info);
    await mutateAsync(info);
  };

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Card className="w-full grid lg:grid-cols-2 grid-cols-1 py-4 mt-10">
        <CardHeader shadow={false} floated={false}>
          {isLoading ? (
            <Skeleton height={350} />
          ) : (
            <img src={image} alt={name} />
          )}
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            {isLoading ? <Skeleton width={100} /> : category}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {isLoading ? <Skeleton width={200} /> : name}
          </Typography>
          <div className="flex items-center gap-4">
            <Typography color="gray" className="mb-8 font-normal">
              {isLoading ? <Skeleton width={50} /> : `Age: ${age}`}
            </Typography>
            <Typography color="gray" className="mb-8 font-normal">
              {isLoading ? <Skeleton width={100} /> : `Location: ${location}`}
            </Typography>
          </div>
          <Typography>
            <span className="font-bold">About the pet: </span>
            {isLoading ? <Skeleton count={2} /> : short_des}
          </Typography>
          <Typography>
            <span className="font-bold">Description: </span>
            {isLoading ? <Skeleton count={4} /> : long_des}
          </Typography>
          <Button
            onClick={handleOpen}
            className="bg-primary mt-2"
            disabled={isLoading}
          >
            {isLoading ? <Skeleton width={100} /> : "Adopt"}
          </Button>
        </CardBody>
      </Card>

      <Dialog open={open} onClose={handleOpen}>
        <DialogHeader>
          <h3 className="text-center">{name}</h3>
        </DialogHeader>
        <form onSubmit={handleFormSubmit(onSubmit)}>
          <DialogBody>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Your Name
                </Typography>
                <Input
                  size="lg"
                  label={user?.displayName}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  disabled
                />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Your Email
                </Typography>
                <Input
                  size="lg"
                  label={user?.email}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  disabled
                />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Phone number
                </Typography>
                <Input
                  size="lg"
                  type="number"
                  placeholder="Phone number"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  {...register("number", { required: true })}
                />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Address
                </Typography>
                <Input
                  size="lg"
                  placeholder="Address"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  {...register("address", { required: true })}
                />
              </div>
            </div>
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
            <Button type="submit" className="bg-primary">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default PetDetails;
