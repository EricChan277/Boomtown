import itemReducer from "./modules/items";
import { combineReducers } from "redux";

export default combineReducers({
  item: itemReducer
});
