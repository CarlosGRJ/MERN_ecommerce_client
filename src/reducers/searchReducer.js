import { types } from '../types/types';

export const searchReducer = (state = { text: '' }, action) => {
   switch (action.type) {
      case types.searchQuery:
         return { ...state, ...action.payload };

      default:
         return state;
   }
};
