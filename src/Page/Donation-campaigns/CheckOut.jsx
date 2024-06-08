import { CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { Button, Input, Typography } from '@material-tailwind/react';
import  { useState } from 'react';
import useAuth from './../../Hook/useAuth';

const CheckOut = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpires, setCardExpires] = useState('');
    const [cardCVC, setCardCVC] = useState('');
    const [holderName, setHolderName] = useState('');
  const {user}=useAuth()
    return (
        <form className="flex flex-col gap-4">
        <div>
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Your Email
            </Typography>
            <Input
                type="email"
             defaultValue={user?.email}
              disabled
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            />
        </div>
        <div className="my-3">
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Card Details
            </Typography>
            <Input
                maxLength={19}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                icon={<CreditCardIcon className="absolute left-0 h-4 w-4 text-blue-gray-300" />}
                placeholder="0000 0000 0000 0000"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            />
            <div className="my-4 flex items-center gap-4">
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                        Expires
                    </Typography>
                    <Input
                        maxLength={5}
                        value={cardExpires}
                        onChange={(e) => setCardExpires(e.target.value)}
                        containerProps={{ className: "min-w-[72px]" }}
                        placeholder="00/00"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                </div>
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                        CVC
                    </Typography>
                    <Input
                        maxLength={4}
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value)}
                        containerProps={{ className: "min-w-[72px]" }}
                        placeholder="000"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                </div>
            </div>
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Holder Name
            </Typography>
            <Input
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                placeholder="John Doe"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            />
        </div>
        <Button className='bg-primary' size="lg">Pay Now</Button>
        <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
        >
            <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are secure and encrypted
        </Typography>
    </form>
    );
};

export default CheckOut;