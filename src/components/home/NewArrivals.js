import React, { useEffect, useState } from 'react';
import { LoadingCard } from '../cards/LoadingCard';
import { ProductCard } from '../cards/ProductCard';
import { getProducts, getProductsCount } from '../../functions/product';
import { Pagination } from 'antd';

export const NewArrivals = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [productsCount, setProductsCount] = useState(0);
   const [page, setPage] = useState(1);

   useEffect(() => {
      loadAllProducts(page);
   }, [page]);

   useEffect(() => {
      getProductsCount().then((res) => setProductsCount(res.data));
   }, []);

   const loadAllProducts = (page) => {
      setLoading(true);
      // sort, order, page
      getProducts('createdAt', 'desc', page).then((res) => {
         setProducts(res.data);
         setLoading(false);
      });
   };

   return (
      <>
         <div className='container'>
            {loading ? (
               <LoadingCard count={3} />
            ) : (
               <div className='row'>
                  {products.map((product) => (
                     <div className='col-md-4' key={product._id}>
                        <ProductCard product={product} />
                     </div>
                  ))}
               </div>
            )}
         </div>

         <div className='row'>
            <nav className='col-md-4 offset-md-4 text-center pt-5 p-3'>
               <Pagination
                  current={page}
                  total={(productsCount / 3) * 10}
                  onChange={(value) => setPage(value)}
               />
            </nav>
         </div>
      </>
   );
};
