import { createStore,combineReducers} from 'redux';
import DataReducer from '../components/reducer';
const reducer = combineReducers({
    DataReducer:DataReducer

});
const store = createStore(reducer);
export default store;