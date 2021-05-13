import { useState } from 'react';

export const useForm = (initialState = {}) => {
   const [values, setValues] = useState(initialState);

   const reset = (newFormState = initialState) => {
      setValues(newFormState);
   };

   const handleInputChange = ({ target }) => {
      setValues((prevState) => {
         // console.log('prevState ', prevState);
         return {
            ...prevState,
            [target.name]: target.value,
         };
      });
   };

   return [values, handleInputChange, reset];
};
