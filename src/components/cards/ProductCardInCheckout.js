import React from 'react';
import ModalImage from 'react-modal-image';
import laptop from '../../images/macbookpro.webp'; // DEFAULT IMAGE
import { useDispatch } from 'react-redux';
import { types } from '../../types/types';
import { toast } from 'react-toastify';
import {
   CheckCircleOutlined,
   CloseCircleOutlined,
   CloseOutlined,
} from '@ant-design/icons';

export const ProductCardInCheckout = ({ p }) => {
   const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
   const dispatch = useDispatch();

   const handleColorChange = (e) => {
      // console.log('color changed', e.target.value);
      let cart = [];

      if (typeof window !== 'undefined') {
         if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
         }

         cart.forEach((product, i) => {
            if (product._id === p._id) {
               cart[i].color = e.target.value;
            }
         });

         // console.log('cart update color', cart);
         localStorage.setItem('cart', JSON.stringify(cart));
         dispatch({
            type: types.addToCart,
            payload: cart,
         });
      }
   };

   const handleQuantityChange = (e) => {
      // console.log('available quantity', p.quantity);
      const count = e.target.value < 1 ? 1 : e.target.value;

      if (count > p.quantity) {
         toast.error(`Max available quantity: ${p.quantity}`);
         return;
      }
      let cart = [];

      if (typeof window !== 'undefined') {
         if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
         }

         cart.map((product, i) => {
            if (product._id === p._id) {
               return (cart[i].count = count);
            } else {
               return '';
            }
         });

         localStorage.setItem('cart', JSON.stringify(cart));
         dispatch({
            type: types.addToCart,
            payload: cart,
         });
      }
   };

   const handleRemove = () => {
      // console.log('to remove', p._id);
      let cart = [];

      if (typeof window !== 'undefined') {
         if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
         }

         cart.map((product, i) => {
            if (product._id === p._id) {
               return cart.splice(i, 1);
            } else {
               return '';
            }
         });

         localStorage.setItem('cart', JSON.stringify(cart));
         dispatch({
            type: types.addToCart,
            payload: cart,
         });
      }
   };

   return (
      <tbody>
         <tr>
            <td>
               <div style={{ width: '100px', height: 'auto' }}>
                  {p.images.length ? (
                     <ModalImage
                        small={p.images[0].url}
                        large={p.images[0].url}
                     />
                  ) : (
                     <ModalImage small={laptop} large={laptop} />
                  )}
               </div>
            </td>
            <td>{p.title}</td>
            <td>{p.price}</td>
            <td>{p.brand}</td>
            <td>
               <select
                  onChange={handleColorChange}
                  name='color'
                  className='form-control'>
                  {p.color ? (
                     <option value={p.color}>{p.color}</option>
                  ) : (
                     <option>Select</option>
                  )}
                  {colors
                     .filter((c) => c !== p.color)
                     .map((c) => (
                        <option key={c} value={c}>
                           {c}
                        </option>
                     ))}
               </select>
            </td>
            <td className='text-center'>
               <input
                  type='number'
                  className='form-control'
                  value={p.count}
                  onChange={handleQuantityChange}
               />
            </td>
            <td className='text-center'>
               {p.shipping === 'Yes' ? (
                  <CheckCircleOutlined className='text-success' />
               ) : (
                  <CloseCircleOutlined className='text-danger' />
               )}
            </td>
            <td className='text-center'>
               <CloseOutlined
                  onClick={handleRemove}
                  className='text-danger pointer'
               />
            </td>
         </tr>
      </tbody>
   );
};
