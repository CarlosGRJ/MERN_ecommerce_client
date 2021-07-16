import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
   getCoupons,
   removeCoupon,
   createCoupon,
} from '../../../functions/coupon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import { AdminNav } from '../../../components/nav/AdminNav';

export const CreateCouponPage = () => {
   return (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col-md-2'>
               <AdminNav />
            </div>
            <div className='col-md-10'>
               <h4>Coupon</h4>
            </div>
         </div>
      </div>
   );
};
