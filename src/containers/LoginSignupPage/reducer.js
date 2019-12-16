import produce from 'immer';
import {
    REGISTER_NEW_USER_ERROR,
    REGISTER_NEW_USER_SUCCESS,
    UPDATE_USER_FIELD,
    RESET_USER_REDUCER,
    LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGOUT_USER
} from './constants';
import {LOGIN_USER, REGISTER_NEW_USER} from "containers/LoginSignupPage/constants";

// The initial state of the App
export const initialState = {
    uid: '',
    email: '',
    name: '',
    password: '',
    loading: false,
    error: ''
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case UPDATE_USER_FIELD:
                draft[action.field] = action.value;
                break;
            case REGISTER_NEW_USER:
            case LOGIN_USER:
                draft.loading = true;
                break;
            case REGISTER_NEW_USER_SUCCESS:
            case LOGIN_USER_SUCCESS:
                draft.loading = false;
                draft.uid = action.user.uid;
                draft.email = action.user.email;
                draft.name = action.user.displayName;
                break;
            case REGISTER_NEW_USER_ERROR:
            case LOGIN_USER_ERROR:
                draft.loading = false;
                draft.error = action.error;
                break;
            case RESET_USER_REDUCER:
                draft = initialState;
                break;
        }
    });

export default homeReducer;