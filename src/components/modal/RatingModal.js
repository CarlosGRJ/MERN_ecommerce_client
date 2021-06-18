import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { toast } from 'react-toastify';
import { StarOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const RatingModal = ({ children }) => {
   const { user } = useSelector((state) => ({ ...state }));
   const [modalVisible, setModalVisible] = useState(false);
   
   const history = useHistory();

   const handleModal = () => {
      if ( user && user.token) {
         setModalVisible(true);
      } else {
         history.push('/login');
      }
   }

   return (
      <>
         <div onClick={handleModal}>
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
