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

   const showOrderInTable = (order) => (
      <table className='table table-bordered'>
         <thead className='thead-light'>
            <tr>
               <th scope='col'>Title</th>
               <th scope='col'>Price</th>
               <th scope='col'>Brand</th>
               <th scope='col'>Color</th>
               <th scope='col'>Count</th>
               <th scope='col'>Shipping</th>
            </tr>
         </thead>
         <tbody>
            {order.products.map((p) => (
               <tr key={p._id}>
                  <td>
                     <b>{p.product.title}</b>
                  </td>
                  <td>${p.product.price}</td>
                  <td>{p.product.brand}</td>
                  <td>{p.color}</td>
                  <td>{p.count}</td>
                  <td>
                     {p.product.shipping === 'Yes' ? (
                        <CheckCircleOutlined className='text-success' />
                     ) : (
                        <CloseCircleOutlined className='text-danger' />
                     )}
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );

   const showEachOrders = () =>
      orders.map((order) => (
         <div className='m-5 p-3 card' key={order._id}>
            <p>show payment info</p>
            {showOrderInTable(order)}
            <div className='row'>
               <div className='col'>
                  <p>PDF download</p>
               </div>
            </div>
         </div>
      ));

   return (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col-md-2'>
               <UserNav />
            </div>
            <div className='col text-center'>
               <h4>
                  {orders.length > 0
                     ? 'User purchase orders'
                     : 'No purchase orders'}
               </h4>
               {showEachOrders()}
            </div>
         </div>
      </div>
   );
};
