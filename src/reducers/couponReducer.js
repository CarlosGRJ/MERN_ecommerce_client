import { types } from '../types/types';

export const couponReducer = (state = false, action) => {
   switch (action.type) {
      case types.couponApplied:
         return action.payload;

      default:
         return state;
   }
};
