import React from 'react';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { useForm } from '../../hooks/useForm';

const Register = () => {
   const [formValues, handleInputChange, reset] = useForm({
      email: '',
   });

   const { email } = formValues;

   const handleSubmit = async (e) => {
      e.preventDefault();
      const config = {
         url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
         handleCodeInApp: true,
      };

      await auth.sendSignInLinkToEmail(email, config);
      toast.success(
         `Email is sent to ${email}. Click the link to complete your registration.`,
      );
      // Save user email in local storage
      window.localStorage.setItem('emailForRegistration', email);
      // clear state
      reset();
   };

   const registerForm = () => (
      <form onSubmit={handleSubmit}>
         <input
            type='email'
            className='form-control'
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleInputChange}
            autoFocus
            autoComplete='off'
         />

         <br />

         <button type='submit' className='btn btn-raised'>
            Register
         </button>
      </form>
   );

   return (
      <div className='container p-5'>
         <div className='row'>
            <div className='col-md-6 offset-md-3'>
               <h4>Register</h4>
               {registerForm()}
            </div>
         </div>
      </div>
   );
};

export default Register;
