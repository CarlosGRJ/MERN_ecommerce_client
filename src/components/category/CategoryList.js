import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';

export const CategoryList = () => {
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setLoading(true);
      getCategories().then((c) => {
         setCategories(c.data.categories);
         setLoading(false);
      });
   }, []);

   const showCategories = () => {
      return categories.map((c) => (
         <div
            key={c._id}
            className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
            <Link to={`/category/${c.slug}`}>{c.name}</Link>
         </div>
      ));
   };

   return (
      <div className='container'>
         <div className='row'>
            {loading ? (
               <h4 className='text-center'>Loading...</h4>
            ) : (
               showCategories()
            )}
         </div>
      </div>
   );
};
