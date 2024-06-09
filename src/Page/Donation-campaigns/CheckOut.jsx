/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useAuth from './../../Hook/useAuth';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { Input, Typography } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const CheckOut = ({data}) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [price, setPrice] = useState(5);
  const { user } = useAuth();
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    if (price > 0) {
      getClientSecret(price);
    }
  }, [price]);

  const getClientSecret = async (price) => {
    try {
      const { data } = await axiosSecure.post('/create-payment-intent', { price });
      console.log('clientSecret from server--->', data);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error fetching client secret', error);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
     const info = {
        donation_amount:data.donation_amount+price
     }
      const { data: pauseData } = await axiosSecure.patch(`/update-cam/${data._id}`,info);
      return pauseData;
    },
    onSuccess: () => {
    toast.success('donation succecful')
    
    },
  });





  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    setProcessing(true);

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      console.log('[error]', error);
      return;
    }

    // Confirm the payment with the client secret
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log('[confirmError]', confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      console.log('[PaymentIntent]', paymentIntent);
      // Create payment info object
      const paymentInfo = {
        transactionId: paymentIntent.id,
        date: new Date(),
      };
     await mutateAsync()
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
        Donation amount
      </Typography>
      <Input
        type="number"
        size="lg"
        onBlur={(e) => setPrice(parseFloat(e.target.value))}
        placeholder="Enter donation amount"
        className={`!border-t-blue-gray-200 focus:!border-primary`}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {cardError && <p className="text-red-500">{cardError}</p>}
      <button type="submit" disabled={!stripe || !clientSecret || processing}>
        {processing ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default CheckOut;
