import React from 'react';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/macbookpro.webp'; // DEFAULT IMAGE
import { Link } from 'react-router-dom';

const { Meta } = Card;

export const ProductCard = ({ product }) => {
   // destructure
   const { title, description, images, slug } = product;

   return (
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
            <>
               <ShoppingCartOutlined className='text-danger' /> <br /> Add to
               cart
            </>,
         ]}>
         <Meta
            title={title}
            description={`${description && description.substring(0, 40)}...`}
         />
      </Card>
   );
};
