import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent } from '../functions/stripe';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import Laptop from '../images/macbookpro.webp'; // default image

const cardStyle = {
   style: {
      base: {
         color: '#32325d',
         fontFamily: 'Arial, sans-serif',
         fontSmoothing: 'antialiased',
         fontSize: '16px',
         '::placeholder': {
            color: '#32325d',
         },
      },
      invalid: {
         color: '#fa755a',
         iconColor: '#fa755a',
      },
   },
};

export const StripeCheckout = ({ history }) => {
   const dispatch = useDispatch();
   const { user, coupon } = useSelector((state) => ({ ...state }));

   const [succeeded, setSucceeded] = useState(false);
   const [error, setError] = useState(null);
   const [processing, setProcessing] = useState('');
   const [disabled, setDisabled] = useState(true);
   const [clientSecret, setClientSecret] = useState('');

   const [cartTotal, setCartTotal] = useState(0);
   const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
   const [payable, setPayable] = useState(0);

   const stripe = useStripe();
   const elements = useElements();

   useEffect(() => {
      createPaymentIntent(user.token, coupon)
         .then((res) => {
            console.log('create payment intent', res.data);
            setClientSecret(res.data.clientSecret);
            // additional response received on successful payment
            setCartTotal(res.data.cartTotal);
            setTotalAfterDiscount(res.data.totalAfterDiscount);
            setPayable(res.data.payable);
         })
         .catch((err) => console.log('err Payment Intent', err));
   }, [user.token, coupon]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
               name: e.target.name.value,
            },
         },
      });

      if (payload.error) {
         setError(`Payment failed ${payload.error.message}`);
         setProcessing(false);
      } else {
         // here you get result after successful payment
         // create order and save in database for admin to process
         // empty user cart from redux store and localStorage
         console.log(payload);
         setError(null);
         setProcessing(false);
         setSucceeded(true);
      }
   };

   const handleChange = async (e) => {
      // Listen for changes in the card element
      // And display any errors the customer types their card details
      setDisabled(e.empty); // disable pay button if errors
      //   console.log('e.empty ', e.empty); // true / false
      setError(e.error ? e.error.message : ''); // show error message
      console.log('e.error ', e.error);
   };

   return (
      <>
         {!succeeded && (
            <div>
               {coupon && totalAfterDiscount !== undefined ? (
                  <p className='alert alert-success'>{`Total after discount: $${totalAfterDiscount}`}</p>
               ) : (
                  <p className='alert alert-danger'>No coupon applied</p>
               )}
            </div>
         )}
         <div className='text-center pb-5'>
            <Card
               cover={
                  <img
                     src={Laptop}
                     style={{
                        height: '200px',
                        objectFit: 'cover',
                        marginBottom: '-50px',
                     }}
                     alt=''
                  />
               }
               actions={[
                  <>
                     <DollarOutlined className='text-info' /> <br /> Total: $
                     {cartTotal}
                  </>,
                  <>
                     <CheckOutlined className='text-success' /> <br /> Total
                     payable: ${(payable / 100).toFixed(2)}
                  </>,
               ]}
            />
         </div>

         <form
            id='payment-form'
            className='stripe-form'
            onSubmit={handleSubmit}>
            <CardElement
               id='card-element'
               options={cardStyle}
               onChange={handleChange}
            />
            <button
               className='stripe-button'
               disabled={processing || disabled || succeeded}>
               <span id='button-text'>
                  {processing ? (
                     <div className='spinner' id='spinner'></div>
                  ) : (
                     'Pay'
                  )}
               </span>
            </button>
            <br />
            {error && (
               <div className='card-error' role='alert'>
                  {error}
               </div>
            )}
            <br />
            <p
               className={
                  succeeded ? 'result-message' : 'result-message hidden'
               }>
               Payment Successful.{' '}
               <Link to='/user/history'>See it in your purchase history.</Link>
            </p>
         </form>
      </>
   );
};
