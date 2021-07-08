import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/macbookpro.webp'; // DEFAULT IMAGE
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { types } from '../../types/types';

const { Meta } = Card;

export const ProductCard = ({ product }) => {
   const [tooltip, setTooltip] = useState('Click to add');

   // Redux
   const { user, cart } = useSelector((state) => ({ ...state }));
   const dispatch = useDispatch();

   // destructure
   const { title, description, images, slug, price } = product;

   const handleAddToCart = () => {
      // create cart array
      let cart = [];

      if (typeof window !== 'undefined') {
         // if cart is in localStorage GET it
         if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
         }
         // push new product to cart
         cart.push({
            ...product,
            count: 1,
         });
         console.log('CART --> ', cart);
         // remove duplicates
         const unique = _.uniqWith(cart, _.isEqual);
         console.log('unique ', unique);
         // save to Local Storage
         localStorage.setItem('cart', JSON.stringify(unique));
         // show tooltip
         setTooltip('Added');

         // add to redux state
         dispatch({
            type: types.addToCart,
            payload: unique,
         });
      }
   };

   return (
      <>
         {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
         ) : (
            <div className='text-center pt-1 pb-3'>No rating yet</div>
         )}
         <Card
            cover={
               <img
                  src={images && images.length ? images[0].url : laptop}
                  style={{ height: '150px', objectFit: 'cover' }}
                  className='p-1'
                  alt=''
               />
            }
            actions={[
               <Link to={`/product/${slug}`}>
                  <EyeOutlined className='text-primary' /> <br /> View Produt
               </Link>,
               <Tooltip title={tooltip}>
                  <span onClick={handleAddToCart}>
                     <ShoppingCartOutlined className='text-danger' /> <br /> Add
                     to cart
                  </span>
               </Tooltip>,
            ]}>
            <Meta
               title={`${title} - $${price}`}
               description={`${description && description.substring(0, 40)}...`}
            />
         </Card>
      </>
   );
};
