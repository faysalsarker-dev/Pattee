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
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxiosCommon";
import useAuth from "../../Hook/useAuth";

const PetDetails = () => {
  const [open, setOpen] = useState(false);
  const address = useRef(null);
  const number = useRef(null);
  const { user } = useAuth();
  const axiosCommon = useAxios();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["pet"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/pet/${id}`);
      return data;
    },
  });

  const handleSubmit = () => {
    console.log(address.current.value, number.current.value);
  };

  const handleOpen = () => setOpen(!open);

  const obj = {
    name: "dfhui",
    id: "fuirhu",
  };

  return (
    <>
      <Card className="w-full grid lg:grid-cols-2 grid-cols-1 py-4 mt-10">
        <CardHeader shadow={false} floated={false}>
          <img
            src="https://img.freepik.com/free-photo/adorable-looking-kitten-with-dog_23-2150886418.jpg?t=st=1717322561~exp=1717326161~hmac=4daa2666663f048b6764ea498628a8399359225ebdd3ef53aa1171620aa8c780&w=900"
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            startups
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Lyft launching cross-platform service this week
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Like so many organizations these days, Autodesk is a company in
            transition. It was until recently a traditional boxed software
            company selling licenses. Yet its own business model disruption is
            only part of the story
          </Typography>

          <Button onClick={handleOpen} className="bg-primary">
            Adopt
          </Button>
        </CardBody>
      </Card>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <h3 className="text-center">{obj.name}</h3>
        </DialogHeader>
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
                ref={number}
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
                ref={address}
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
          <Button
            className="bg-primary"
            onClick={() => {
              handleOpen(),
               handleSubmit();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default PetDetails;
