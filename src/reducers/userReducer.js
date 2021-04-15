import { types } from '../types/types';

export const userReducer = (state = null, action) => {
   switch (action.type) {
      case types.authLogin:
         return action.payload;

      case types.authLogout:
         return action.payload;

      default:
         return state;
   }
};
