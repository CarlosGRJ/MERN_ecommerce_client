import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { currentAdmin } from '../functions/auth';
import { LoadingToRedirect } from './LoadingToRedirect';

export const AdminRoute = ({ children, ...rest }) => {
   const { user } = useSelector((state) => ({ ...state }));
   const [ok, setOk] = useState(false);

   useEffect(() => {
      if (user && user.token) {
         currentAdmin(user.token)
            .then((res) => {
               // console.log('CURRENT ADMIN RES', res);
               setOk(true);
            })
            .catch((err) => {
               console.log('ADMIN ROUTE ERR', err);
               setOk(false);
            });
      }
   }, [user]);

   return ok ? (
      <Route {...rest} />
   ) : (
      <LoadingToRedirect />
   );
};
