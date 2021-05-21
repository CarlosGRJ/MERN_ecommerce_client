import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

// Components
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { Header } from './components/nav/Header';
import { RegisterComplete } from './pages/auth/RegisterComplete';

import { auth } from './firebase/firebase';
import { types } from './types/types';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { currentUser } from './functions/auth';
import { History } from './pages/user/History';
import { UserRoute } from './routes/UserRoute';
import { Password } from './pages/user/Password';
import { Wishlist } from './pages/user/Wishlist';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminRoute } from './routes/AdminRoute';
import { CategoryCreate } from './pages/admin/category/CategoryCreate';
import { CategoryUpdate } from './pages/admin/category/CategoryUpdate';
import { SubCreate } from './pages/admin/sub/SubCreate';

const App = () => {
   const dispatch = useDispatch();

   // to check firebase auth state
   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
         if (user) {
            const idTokenResult = await user.getIdTokenResult();
            console.log('user', user);

            currentUser(idTokenResult.token)
               .then((res) => {
                  console.log('RES NOW ', res);
                  dispatch({
                     type: types.authLogin,
                     payload: {
                        name: res.data.user.name,
                        email: res.data.user.email,
                        token: idTokenResult.token,
                        role: res.data.user.role,
                        _id: res.data.user._id,
                     },
                  });
               })
               .catch((err) => console.log(err));
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
            <Route exact path='/forgot/password' component={ForgotPassword} />

            <UserRoute exact path='/user/history' component={History} />
            <UserRoute exact path='/user/password' component={Password} />
            <UserRoute exact path='/user/wishlist' component={Wishlist} />

            <AdminRoute
               exact
               path='/admin/dashboard'
               component={AdminDashboard}
            />
            <AdminRoute
               exact
               path='/admin/category'
               component={CategoryCreate}
            />
            <AdminRoute
               exact
               path='/admin/category/:slug'
               component={CategoryUpdate}
            />
            <AdminRoute exact path='/admin/sub' component={SubCreate} />
         </Switch>
      </>
   );
};

export default App;
