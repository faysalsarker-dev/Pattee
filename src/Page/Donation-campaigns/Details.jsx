import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxios from '../../Hook/useAxiosCommon';
import { Alert, Button, Card, CardBody, CardHeader, Dialog, Typography } from '@material-tailwind/react';
import Skeleton from 'react-loading-skeleton';
import { useState } from 'react';
import CheckOut from './CheckOut';

const Details = () => {
    const { id } = useParams();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    const axiosCommon = useAxios();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["pet", id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/campaigns-details/${id}`);
            return data;
        },
    });

    const exPire = new Date(data.last_date).toLocaleDateString() > new Date().toLocaleDateString();
    
    return (
        <>
            {(exPire || data.pause) && (
                <Alert className='mt-3' variant="outlined">
                  
                    <h2 className=' flex items-center gap-2 '>  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                    </svg>The campaign is {exPire ? 'expired' : 'paused'}</h2>
                </Alert>
            )}
            <Card className="w-full grid lg:grid-cols-2 grid-cols-1 py-4 mt-6">
                <CardHeader shadow={false} floated={false} className="p-4">
                    {isLoading ? (
                        <Skeleton height={350} />
                    ) : (
                        <img src={data.image} alt={data.name} className="w-full h-auto rounded-lg object-cover" />
                    )}
                </CardHeader>
                <CardBody>
                    <Typography variant="h6" color="gray" className="mb-4 uppercase">
                        {isLoading ? <Skeleton width={100} /> : `Donation Last Date: ${new Date(data.last_date).toLocaleDateString()}`}
                    </Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {isLoading ? <Skeleton width={200} /> : data.name}
                    </Typography>
                    <div className="flex items-center gap-4">
                        <Typography color="gray" className="mb-8 font-normal">
                            {isLoading ? <Skeleton width={50} /> : `Maximum amount: ${data.maximum_amount}`}
                        </Typography>
                    </div>
                    <Typography className="mb-4">
                        <span className="font-bold">About the pet: </span>
                        {isLoading ? <Skeleton count={2} /> : data.short_des}
                    </Typography>
                    <Typography className="mb-4">
                        <span className="font-bold">Description: </span>
                        {isLoading ? <Skeleton count={4} /> : data.long_des}
                    </Typography>
                    <Button
                        onClick={handleOpen}
                        className="bg-primary mt-2"
                        disabled={isLoading || exPire || data.pause}
                    >
                        {isLoading ? <Skeleton width={100} /> : "Donate Now"}
                    </Button>
                </CardBody>
            </Card>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem] relative">
                    <CardBody>
                        <button onClick={handleOpen} className='absolute top-5 right-5 border rounded-full font-extrabold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <Typography variant="h5" color="blue-gray" className="text-center mb-4">
                            Donation Form
                        </Typography>
                        <CheckOut />
                    </CardBody>
                </Card>
            </Dialog>
        </>
    );
};

export default Details;
