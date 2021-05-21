import React from 'react';
import { AdminNav } from '../../../components/nav/AdminNav';

export const SubCreate = () => {
   return (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col-md-2'>
               <AdminNav />
            </div>
            <div className='col-md-10'>Sub create Page</div>
         </div>
      </div>
   );
};
