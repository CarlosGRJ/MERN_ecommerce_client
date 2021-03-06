import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getProduct, productStar } from '../functions/product';
import { SingleProduct } from '../components/cards/SingleProduct';
import { getRelated } from '../functions/product';
import { ProductCard } from '../components/cards/ProductCard';

const Product = ({ match }) => {
   const [product, setProduct] = useState({});
   const [related, setRelated] = useState([]);
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
      getProduct(slug)
         .then((res) => {
            setProduct(res.data);
            // load Related Products
            getRelated(res.data._id)
               .then((res) => {
                  setRelated(res.data);
               })
               .catch((err) => console.log(err));
         })
         .catch((err) => console.log(err));
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

         <div className='row pb-5'>
            {related.length ? (
               related.map((r) => (
                  <div key={r._id} className='col-md-4'>
                     <ProductCard product={r} />
                  </div>
               ))
            ) : (
               <div className='text-center col'>No products found</div>
            )}
         </div>
      </div>
   );
};

export default Product;