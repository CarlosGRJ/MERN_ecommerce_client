import React, { useEffect, useState } from 'react';
import { LoadingCard } from '../cards/LoadingCard';
import { ProductCard } from '../cards/ProductCard';
import { getProducts } from '../../functions/product';

export const BestSellers = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      loadAllProducts();
   }, []);

   const loadAllProducts = () => {
      setLoading(true);
      // sort, order, limit
      getProducts('sold', 'desc', 3).then((res) => {
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
      </>
   );
};
