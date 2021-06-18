import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getProduct, productStar } from '../functions/product';
import { SingleProduct } from '../components/cards/SingleProduct';

export const Product = ({ match }) => {
   const [product, setProduct] = useState({});
   const [star, setStar] = useState(0);
   // redux
   const { user } = useSelector((state) => ({ ...state }));

   const { slug } = match.params;

   useEffect(() => {
      loadSingleProduct(slug);
   }, [slug]);

   useEffect(() => {
      if (product.ratings && user) {
         const existingRatingObject = product.ratings.find(
            (ele) => ele.postedBy.toString() === user._id.toString(),
         );
         // console.log('existingRatingObject ', existingRatingObject);
         existingRatingObject && setStar(existingRatingObject.star); // current user's star
      }
   }, [product, user]);

   const loadSingleProduct = (slug) => {
      getProduct(slug).then((res) => setProduct(res.data));
   };

   const onStarClick = (newRating, name) => {
      setStar(newRating);
      console.table(newRating, name);
      productStar(name, newRating, user.token)
         .then((res) => {
            console.log('rating clicked', res.data);
            loadSingleProduct(slug); // show updated rating in real time
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <div className='container-fluid'>
         <div className='row pt-4'>
            <SingleProduct
               product={product}
               onStarClick={onStarClick}
               star={star}
            />
         </div>

         <div className='row'>
            <div className='col text-center py-5'>
               <hr />
               <h4>Related Products</h4>
               <hr />
            </div>
         </div>
      </div>
   );
};
