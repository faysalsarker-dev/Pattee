/* eslint-disable react/prop-types */
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Progress,
  
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
   
 
  


const DonationCard = ({pd}) => {
  const progress = (pd.donation_amount / pd.maximum_amount) * 100;
    return (
        <Card className="w-full max-w-[26rem] shadow-lg">
        <CardHeader floated={false} color="blue-gray">
          <img
            src={pd.image}
            alt="ui/ux review check"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          
        </CardHeader>
        <CardBody>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              {pd.name}
            </Typography>
          
          </div>

         <div className="flex justify-between items-center"> 
           <div>donated :${pd.donation_amount}</div>
           <div>maximum :${pd.maximum_amount}</div>
            </div>
            <div className="mt-5"><Progress color="blue" value={progress} /></div>
        </CardBody>
        <CardFooter className="pt-3">
     <Link to={`/Donation-details/${pd._id}`}>
              <Button className="bg-primary" size="lg" fullWidth={true}>
                View Details
              </Button>
     </Link>
        </CardFooter>
      </Card>
    );
};

export default DonationCard;

