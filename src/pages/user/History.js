import React, { useEffect, useState } from 'react';
import { UserNav } from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export const History = () => {
   const [orders, setOrders] = useState([]);
   const { user } = useSelector((state) => ({ ...state }));

   useEffect(() => {
      loadUserOrders(user);
   }, [user]);

   const loadUserOrders = (user) => {
      getUserOrders(user.token).then((res) => {
         console.log('res ', res);
         setOrders(res.data);
      });
   };

   return (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col-md-2'>
               <UserNav />
            </div>
            <div className='col'>user history page</div>
         </div>
      </div>
   );
};
