import React from 'react';
import { useForm } from '../../hooks/useForm';

const Register = () => {
   const [formValues, handleInputChange] = useForm({
      email: '',
   });

   const { email } = formValues;

   const handleSubmit = () => {
      //
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
