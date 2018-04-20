import itemReducer from "./modules/items";
import { combineReducers } from "redux";

export default combineReducers({
  itemsData: itemReducer
});
