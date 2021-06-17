import React from 'react';
import { Card, Tabs } from 'antd';
import StarRating from 'react-star-ratings';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Laptop from '../../images/macbookpro.webp'; // Default Image
import { ProductListItems } from './ProductListItems';

const { TabPane } = Tabs;

export const SingleProduct = ({ product }) => {
   const { title, images, description, _id } = product;

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
            <StarRating
               name={_id}
               numberOfStars={5}
               rating={2}
               changeRating={(newRating, name) =>
                  console.log('New rating', newRating, 'name', name)
               }
               isSelectable={true}
               starRatedColor='orangered'
            />
            <Card
               actions={[
                  <>
                     <ShoppingCartOutlined className='text-success' /> <br />{' '}
                     Add to Cart
                  </>,
                  <Link to='/'>
                     <HeartOutlined className='text-info' /> <br /> Add to
                     Wishlist
                  </Link>,
               ]}>
               <ProductListItems product={product} />
            </Card>
         </div>
      </>
   );
};
