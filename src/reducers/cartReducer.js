import { types } from '../types/types';

let initialState = [];

// load cart from Local Storage
if (typeof window !== 'undefined') {
   if (localStorage.getItem('cart')) {
      initialState = JSON.parse(localStorage.getItem('cart'));
   } else {
      initialState = [];
   }
}

export const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.addToCart:
         return action.payload;

      default:
         return state;
   }
};
