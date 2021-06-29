import React, { useState, useEffect } from 'react';
import { ProductCard } from '../../components/cards/ProductCard';
import { getCategory } from '../../functions/category';

export const CategoryHome = ({ match }) => {
   const [category, setCategory] = useState({});
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);

   const { slug } = match.params;

   useEffect(() => {
      setLoading(true);
      getCategory(slug).then((res) => {
         console.log(JSON.stringify(res.data, null, 4));
         setCategory(res.data.category);
         setProducts(res.data.products);
         setLoading(false);
      });
   }, [slug]);

   return (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col'>
               {loading ? (
                  <h4 className='text-center p-3 my-5 display-4 jumbotron'>
                     Loading...
                  </h4>
               ) : (
                  <h4 className='text-center p-3 my-5 display-4 jumbotron'>
                     {products.length} Products in "{category.name}" category
                  </h4>
               )}
            </div>
         </div>

         <div className='row'>
            {products.map((p) => (
               <div className='col-md-4' key={p._id}>
                  <ProductCard product={p} />
               </div>
            ))}
         </div>
      </div>
   );
};