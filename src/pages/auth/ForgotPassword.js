import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { useForm } from '../../hooks/useForm';
import { types } from '../../types/types';

export const ForgotPassword = ({ history }) => {
   const [formValues, handleInputChange, reset] = useForm({
      email: 'carlosgrjpruebas@gmail.com',
   });

   const { email } = formValues;
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      const config = {
         url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
         handleCodeInApp: true,
      };

      await auth
         .sendPasswordResetEmail(email, config)
         .then(() => {
             // clear state
             reset();
            setLoading(false);
            toast.success('Check your email for password reset link');
         })
         .catch((error) => {
            setLoading(false);
            console.log('ERROR MSG IN FORGOT PASSWORD', error);
            toast.error(error.message);
         });
   };

   return (
      <div className='container col-md-6 offset-md-3 p-5'>
         {loading ? (
            <h4 className='text-danger'>Loading</h4>
         ) : (
            <h4>Forgot Password</h4>
         )}

         <form onSubmit={handleSubmit}>
            <input
               type='email'
               className='form-control'
               name='email'
               value={email}
               onChange={handleInputChange}
               placeholder='Type your email'
               autoFocus
            />
            <br />
            <button className='btn btn-raised' disabled={!email}>
               Submit
            </button>
         </form>
      </div>
   );
};
