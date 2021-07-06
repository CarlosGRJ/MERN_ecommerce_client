import React from 'react';
import StarRating from 'react-star-ratings';

export const Star = ({ starClick, numberOfStars }) => {
   return (
      <>
         <StarRating
            changeRating={() => starClick(numberOfStars)}
            numberOfStars={numberOfStars}
            starDimension='20px'
            starSpacing='2px'
            starHoverColor='red'
            starEmptyColor='red'
         />
         <br />
      </>
   );
};
