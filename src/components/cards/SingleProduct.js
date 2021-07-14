import React, { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import StarRating from 'react-star-ratings';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Laptop from '../../images/macbookpro.webp'; // Default Image
import { ProductListItems } from './ProductListItems';
import { RatingModal } from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { types } from '../../types/types';

const { TabPane } = Tabs;

// this is children component of product page
export const SingleProduct = ({ product, onStarClick, star }) => {
   const { title, images, description, _id } = product;
   const [tooltip, setTooltip] = useState('Click to add');

   // Redux
   const { user, cart } = useSelector((state) => ({ ...state }));
   const dispatch = useDispatch();

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
         // show cart items in side drawer
         dispatch({
            type: types.setVisible,
            payload: true,
         });
      }
   };

   return (
      <>
         <div className='col-md-7'>
            {images && images.length ? (
               <Carousel showArrows={true} autoPlay infiniteLoop>
                  {images &&
                     images.map((i) => (
                        <img src={i.url} key={i.public_id} alt='product' />
                     ))}
               </Carousel>
            ) : (
               <Card
                  cover={
                     <img src={Laptop} className='mb-3 card-image' alt='' />
                  }></Card>
            )}

            <Tabs type='card'>
               <TabPane tab='Description' key='1'>
                  {description && description}
               </TabPane>
               <TabPane tab='More' key='2'>
                  Call use on xxxx xxx xxx to learn more about this product.
               </TabPane>
            </Tabs>
         </div>

         <div className='col-md-5'>
            <h1 className='bg-info p-3'>{title}</h1>

            {product && product.ratings && product.ratings.length > 0 ? (
               showAverage(product)
            ) : (
               <div className='text-center pt-1 pb-3'>No rating yet</div>
            )}

            <Card
               actions={[
                  <Tooltip title={tooltip}>
                     <span onClick={handleAddToCart}>
                        <ShoppingCartOutlined className='text-danger' /> <br />{' '}
                        Add to cart
                     </span>
                  </Tooltip>,
                  <Link to='/'>
                     <HeartOutlined className='text-info' /> <br /> Add to
                     Wishlist
                  </Link>,
                  <RatingModal>
                     <StarRating
                        name={_id}
                        numberOfStars={5}
                        rating={star}
                        changeRating={onStarClick}
                        isSelectable={true}
                        starRatedColor='orangered'
                     />
                  </RatingModal>,
               ]}>
               <ProductListItems product={product} />
            </Card>
         </div>
      </>
   );
};
