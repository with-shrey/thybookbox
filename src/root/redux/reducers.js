import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

export const Reducers = (history) => combineReducers({
    router: connectRouter(history),
});