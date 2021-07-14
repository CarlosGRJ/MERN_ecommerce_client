import { types } from '../types/types';

export const drawerReducer = (state = false, action) => {
   switch (action.type) {
      case types.setVisible:
         return action.payload;

      default:
         return state;
   }
};
