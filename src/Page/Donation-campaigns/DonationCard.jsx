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
           <div>donated :</div>
           <div>maximum : ${pd.Maximum_amount}</div>
            </div>
            <Progress color="blue" value={50} />
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

