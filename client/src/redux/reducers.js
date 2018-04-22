import { combineReducers } from 'redux';
import itemReducer from './modules/items';

export default combineReducers({
    itemsData: itemReducer
});
