import { combineReducers } from "redux";
import UserReducers from "./UserReducers";
import FoodReducers from "./FoodReducers";
import ShopReducers from "./ShopReducers";
import AdminReducers from "./AdminReducers";
const rootReducer = combineReducers({
  UserReducers,
  FoodReducers,
  ShopReducers,
  AdminReducers,
});
export default rootReducer;
