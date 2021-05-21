import React from 'react';

export const LocalSearch = ({ keyword, setKeyword }) => {
   const handleSearchChange = (e) => {
      e.preventDefault();
      setKeyword(e.target.value.toLowerCase());
   };

   return (
      <input
         type='search'
         placeholder='filter'
         value={keyword}
         onChange={handleSearchChange}
         className='form-control mb-4'
      />
   );
};
