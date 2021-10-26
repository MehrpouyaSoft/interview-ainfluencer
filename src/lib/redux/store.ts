import { combineReducers, createStore } from "redux";
import tokenReducer from "./reducers/token";
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
    combineReducers({
        token: tokenReducer
    })
    , composeWithDevTools()
)