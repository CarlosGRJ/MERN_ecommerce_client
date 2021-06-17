import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { toast } from 'react-toastify';
import { StarOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

export const RatingModal = ({ children }) => {
   const { user } = useSelector((state) => ({ ...state }));
   const [modalVisible, setModalVisible] = useState(false);

   return (
      <>
         <div onClick={() => setModalVisible(true)}>
            <StarOutlined className='text-danger' />
            <br />
            {user ? 'Leave rating' : 'Login to leave rating'}
         </div>
         <Modal
            title='Leave your rating'
            centered
            visible={modalVisible}
            onOk={() => {
               setModalVisible(false);
               toast.success('Thanks for your review. It will apper soon');
            }}
            onCancel={() => {
               setModalVisible(false);
            }}>
            {children}
         </Modal>
      </>
   );
};
