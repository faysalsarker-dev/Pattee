/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function CardDefault({ pd }) {
  return (
    <Card className="mt-6 ">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={pd.image} alt={pd.name} />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {pd.name}
        </Typography>
<div className="flex gap-4">
    <Typography>
        {pd.age}
    </Typography>
    
    
    
            <Typography className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>{pd.location}
            </Typography>
</div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className="bg-primary">viewing details</Button>
      </CardFooter>
    </Card>
  );
}