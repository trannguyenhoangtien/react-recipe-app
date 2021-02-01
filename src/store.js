import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { recipeReducer } from './reducers/recipeReducers';

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
        recipes: recipeReducer,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;