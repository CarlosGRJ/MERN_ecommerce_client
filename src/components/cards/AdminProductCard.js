import React from 'react';
import { Card } from 'antd';
import laptop from '../../images/macbookpro.webp'; // DEFAULT IMAGE
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

export const AdminProductCard = ({ product, handleRemove }) => {
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
            <EditOutlined className='text-primary' />,
            <DeleteOutlined
               onClick={() => handleRemove(slug)}
               className='text-danger'
            />,
         ]}>
         <Meta
            title={title}
            description={`${description && description.substring(0, 40)}...`}
         />
      </Card>
   );
};
