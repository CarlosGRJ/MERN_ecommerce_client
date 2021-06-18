import React from 'react';
import StarRating from 'react-star-ratings/build/star-ratings';

export const showAverage = (p) => {
   //    console.log('p ', p);
   if (p && p.ratings) {
      const ratingsArray = p && p.ratings;
      //   console.log('ratingsArray ', ratingsArray);
      let total = [];
      const length = ratingsArray.length;
      //   console.log('length ', length);

      ratingsArray.map((r) => total.push(r.star));
      const totalReduced = total.reduce((p, n) => p + n, 0);
      //   console.log('totalReduced ', totalReduced);

      const highest = length * 5;
      //   console.log('highest ', highest);

      const result = (totalReduced * 5) / highest;
      //   console.log('result ', result);

      return (
         <div className='text-center pt-1 pb-3'>
            <span>
               <StarRating rating={result} />
            </span>
         </div>
      );
   }
};
