import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { useForm } from '../../hooks/useForm';
import { useSelector } from 'react-redux';

const ForgotPassword = ({ history }) => {
   const [formValues, handleInputChange, reset] = useForm({
      email: 'carlosgrjpruebas@gmail.com',
   });

   const { email } = formValues;
   const [loading, setLoading] = useState(false);

   const { user } = useSelector((state) => ({ ...state }));

   useEffect(() => {
      if (user && user.token) history.push('/');
   }, [user, history]);

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

export default ForgotPassword;
