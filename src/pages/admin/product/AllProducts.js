import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AdminProductCard } from '../../../components/cards/AdminProductCard';
import { AdminNav } from '../../../components/nav/AdminNav';
import { getProductsByCount, removeProduct } from '../../../functions/product';

const AllProducts = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);
   // redux
   const { user } = useSelector((state) => ({ ...state }));

   useEffect(() => {
      loadAllProducts();
   }, []);

   const loadAllProducts = () => {
      setLoading(true);
      getProductsByCount(100)
         .then((res) => {
            setProducts(res.data);
            setLoading(false);
         })
         .catch((err) => {
            setLoading(false);
            console.log(err);
         });
   };

   const handleRemove = (slug) => {
      const answer = window.confirm(
         'Are you sure you want to delete this product?',
      );
      if (answer) {
         // console.log('send delete request', slug);
         removeProduct(slug, user.token)
            .then((res) => {
               console.log('res', res);
               loadAllProducts();
               toast.error(`${res.data.title} is deleted`);
            })
            .catch((err) => {
               console.log(err);
               if (err.response.status === 400) {
                  toast.error(err.response.data);
               }
            });
      }
   };

   return (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col-md-2'>
               <AdminNav />
            </div>

            <div className='col'>
               {loading ? (
                  <h4 className='text-danger'>Loading...</h4>
               ) : (
                  <h4>All Products</h4>
               )}
               <div className='row'>
                  {products.map((product) => (
                     <div className='col-md-4 pb-3' key={product._id}>
                        <AdminProductCard
                           product={product}
                           handleRemove={handleRemove}
                        />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AllProducts;
