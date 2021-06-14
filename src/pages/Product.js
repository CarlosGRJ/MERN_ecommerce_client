import React, { useState } from 'react';
import { useEffect } from 'react';
import { getProduct } from '../functions/product';
import { SingleProduct } from '../components/cards/SingleProduct';

export const Product = ({ match }) => {
   const [product, setProduct] = useState({});
   const { slug } = match.params;

   useEffect(() => {
      loadSingleProduct(slug);
   }, [slug]);

   const loadSingleProduct = (slug) => {
      getProduct(slug).then((res) => setProduct(res.data));
   };

   return (
      <div className='container-fluid'>
         <div className='row pt-4'>
            <SingleProduct product={product} />
         </div>

         <div className='row'>
            <div>Related Products</div>
         </div>
      </div>
   );
};
