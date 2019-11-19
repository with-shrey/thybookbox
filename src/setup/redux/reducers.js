import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import userReducer from 'containers/LoginSignupPage/reducer';
import bookReducer from "containers/DashboardPage/reducer";

export const combineAllReducers = (history) => combineReducers({
    router: connectRouter(history),
    user: userReducer,
    books: bookReducer
});