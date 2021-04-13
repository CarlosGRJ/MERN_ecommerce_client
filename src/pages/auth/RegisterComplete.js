import React, { useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { useForm } from '../../hooks/useForm';

export const RegisterComplete = ({ history }) => {
   const [formValues, handleInputChange, reset] = useForm({
      email: `${window.localStorage.getItem('emailForRegistration') || ''}`,
      password: '',
   });

   const { email, password } = formValues;

   useEffect(() => {
      //   console.log(window.localStorage.getItem('emailForRegistration'));
      //   console.log(window.location.href);
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      // Validation
      if (!email || !password) {
         toast.error('Email and password are required');
         return;
      }

      if (password.length < 6) {
         toast.error('Password must be at least 6 characters long');
         return;
      }

      try {
         const result = await auth.signInWithEmailLink(
            email,
            window.location.href,
         );
         //  console.log('RESULT ', result);
         if (result.user.emailVerified) {
            // remove user email from local storage
            window.localStorage.removeItem('emailForRegistration');
            // get user id token
            const user = auth.currentUser;
            await user.updatePassword(password);
            const idTokenResult = await user.getIdTokenResult();
            // redux store
            console.log('USER', user, 'idTokenResult ', idTokenResult);
            // redirect
            history.push('/');
         }
      } catch (error) {
         console.log(error);
         toast.error(error.message);
      }
   };

   const completeRegistrationForm = () => (
      <form onSubmit={handleSubmit}>
         <input
            type='email'
            className='form-control'
            placeholder='Email'
            name='email'
            value={email}
            autoFocus
            autoComplete='off'
            disabled
         />

         <input
            type='password'
            className='form-control'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handleInputChange}
            autoFocus
            autoComplete='off'
         />

         <br />

         <button type='submit' className='btn btn-raised'>
            Complete Registration
         </button>
      </form>
   );

   return (
      <div className='container p-5'>
         <div className='row'>
            <div className='col-md-6 offset-md-3'>
               <h4>Register Complete</h4>
               {completeRegistrationForm()}
            </div>
         </div>
      </div>
   );
};
