import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { types } from '../../types/types';

const Login = ({ history }) => {
   const [formValues, handleInputChange, reset] = useForm({
      email: 'carlosgrjpruebas@gmail.com',
      password: '123456',
   });

   const { email, password } = formValues;

   const [loading, setLoading] = useState(false);

   const dispatch = useDispatch();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const result = await auth.signInWithEmailAndPassword(email, password);
         console.log('result ', result);
         const { user } = result;
         const idTokenResult = await user.getIdTokenResult();

         dispatch({
            type: types.authLogin,
            payload: {
               email: user.email,
               token: idTokenResult,
            },
         });
         history.push('/');
      } catch (error) {
         console.log(error);
         toast.error(error.message);
         setLoading(false);
      }
      // clear state
      reset();
   };

   const loginForm = () => (
      <form onSubmit={handleSubmit}>
         <div className='form-group'>
            <input
               type='email'
               className='form-control'
               placeholder='Email'
               name='email'
               value={email}
               onChange={handleInputChange}
            />
         </div>

         <div className='form-group'>
            <input
               type='password'
               className='form-control'
               placeholder='Password'
               name='password'
               value={password}
               onChange={handleInputChange}
               autoComplete='off'
            />
         </div>

         <br />

         <Button
            onClick={handleSubmit}
            type='primary'
            className='mb-3'
            block
            shape='round'
            icon={<MailOutlined />}
            size='large'
            disabled={!email || password.length < 6}>
            Login with Email/Password
         </Button>
      </form>
   );

   return (
      <div className='container p-5'>
         <div className='row'>
            <div className='col-md-6 offset-md-3'>
               <h4>Login</h4>
               {loginForm()}
            </div>
         </div>
      </div>
   );
};

export default Login;
