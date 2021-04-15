import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { Header } from './components/nav/Header';
import { RegisterComplete } from './pages/auth/RegisterComplete';

import { useDispatch } from 'react-redux';
import { auth } from './firebase/firebase';
import { types } from './types/types';

const App = () => {
   const dispatch = useDispatch();
   // to check firebase auth state
   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
         if (user) {
            const idTokenResult = await user.getIdTokenResult();
            console.log('user', user);
            dispatch({
               type: types.authLogin,
               payload: {
                  email: user.email,
                  token: idTokenResult.token,
               },
            });
         }
      });
      // cleanup
      return () => unsubscribe();
   }, [dispatch]);

   return (
      <>
         <Header />
         <ToastContainer />
         <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route
               exact
               path='/register/complete'
               component={RegisterComplete}
            />
         </Switch>
      </>
   );
};

export default App;
