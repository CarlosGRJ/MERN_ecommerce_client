import { combineReducers } from 'redux';
import { searchReducer } from './searchReducer';
import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer';

export const rootReducer = combineReducers({
   user: userReducer,
   search: searchReducer,
   cart: cartReducer,
});
