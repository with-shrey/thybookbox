import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import userReducer from 'containers/LoginSignupPage/reducer';

export const combineAllReducers = (history) => combineReducers({
    router: connectRouter(history),
    user: userReducer
});