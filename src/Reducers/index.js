import HomeReducer from "./HomeReducer";
import {CartReducer} from "./CartReducer";
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


export default reducers;