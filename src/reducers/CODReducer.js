import { types } from '../types/types';

export const CODReducer = (state = false, action) => {
   switch (action.type) {
      case types.cod:
         return action.payload;
      default:
         return state;
   }
};
