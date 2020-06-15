import { combineReducers } from 'redux';
import { sessionReducer } from 'src/reducers';

const createReducer = (asyncReducers) => {
    return combineReducers({
        ...asyncReducers
    })
}

export default createReducer;

