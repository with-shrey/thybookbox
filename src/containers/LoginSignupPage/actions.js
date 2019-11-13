import {
    UPDATE_USER_FIELD,
    REGISTER_NEW_USER,
    RESET_USER_REDUCER,
    REGISTER_NEW_USER_SUCCESS,
    REGISTER_NEW_USER_ERROR,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
} from "containers/LoginSignupPage/constants";

export function updateUserField(field, value) {
    return {
        type: UPDATE_USER_FIELD,
        field,
        value
    };
}

export function resetUserReducer() {
    return {
        type: RESET_USER_REDUCER,
    };
}

export function registerUser() {
    return {
        type: REGISTER_NEW_USER
    }
}

export function registerUserSuccess(user) {
    return {
        type: REGISTER_NEW_USER_SUCCESS,
        user
    }
}

export function registerUserError(error) {
    console.error(error);
    return {
        type: REGISTER_NEW_USER_ERROR,
        error: error.message
    }
}

export function loginUser() {
    return {
        type: LOGIN_USER
    }
}

export function loginUserSuccess(user) {
    return {
        type: LOGIN_USER_SUCCESS,
        user
    }
}

export function loginUserError(error) {
    console.error(error);
    return {
        type: LOGIN_USER_ERROR,
        error: error.message
    }
}
