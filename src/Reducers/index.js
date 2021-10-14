import HomeReducer from "./HomeReducer";
import {CartReducer} from "./CartReducer";
// import { getQuantity } from "./CartReducer";
import { UserReducer } from "./UserReducer";
import { combineReducers } from "redux";
import { OrderReducer } from "./UserOrders";
import {NotificationReducer} from './NotificationReducer';
import { ProductReducer } from "./ProductReducer";
const reducers = combineReducers({
  HomeReducer,
  CartReducer,
  UserReducer,
  OrderReducer,
  NotificationReducer,
  ProductReducer
});
// const getAddedIds = state => fromcart.getAddedIds(state.cart)
// const getQuantity = (state, id) => fromcart.getQuantity(state.cart, id)


// export const getTotal = state =>
//   getAddedIds(state)
//     .reduce((total, id) =>
//       total + getProduct(state, id).price * getQuantity(state, id),
//       0
//     )
//     .toFixed(2)

export default reducers;