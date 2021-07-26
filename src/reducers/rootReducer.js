import { combineReducers } from 'redux';
import { searchReducer } from './searchReducer';
import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer';
import { drawerReducer } from './drawerReducer';
import { couponReducer } from './couponReducer';
import { CODReducer } from './CODReducer';

export const rootReducer = combineReducers({
   user: userReducer,
   search: searchReducer,
   cart: cartReducer,
   drawer: drawerReducer,
   coupon: couponReducer,
   COD: CODReducer,
});
