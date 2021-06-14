import React from 'react';
import { Card } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Laptop from '../../images/macbookpro.webp'; // Default Image

const { Meta } = Card;

export const SingleProduct = ({ product }) => {
   const { title, description, images, slug } = product;

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
                  cover={<img src={Laptop} className='mb-3 card-image' alt='' />}></Card>
            )}
         </div>

         <div className='col-md-5'>
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
               <Meta title={title} description={description} />
               <p>
                  price/category//subs/shipping/color/brand/quantity
                  available/sold
               </p>
            </Card>
         </div>
      </>
   );
};
