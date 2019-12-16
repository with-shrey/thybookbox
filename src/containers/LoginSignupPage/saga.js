import {call, put, select, takeLatest} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import {LOGIN_USER, LOGOUT_USER, REGISTER_NEW_USER} from "containers/LoginSignupPage/constants";
import {makeSelectUser} from "containers/LoginSignupPage/selectors";
import * as firebase from "firebase/app";
import {
    loginUserError,
    loginUserSuccess, logoutUser,
    registerUserError,
    registerUserSuccess
} from "containers/LoginSignupPage/actions";
import {initialState} from "containers/LoginSignupPage/reducer";

/**
 * Github repos request/response handler
 */
export function* registerUserOnFirebase() {

    // Select username from store
    console.log("registerUserOnFirebase")
    const user = yield select(makeSelectUser());
    try {
        const auth = firebase.auth();
        // Call our request helper (see 'utils/request')
        const data = yield call(
            [auth, auth.createUserWithEmailAndPassword],
            user.email, user.password);
        const userPromise = data.user;
        const result = yield call([userPromise, userPromise.updateProfile], {
            displayName: user.name
        });
        console.log(data.user, result);
        localStorage.setItem('logged_in', 'true');
        yield put(registerUserSuccess(data.user));
        yield put(push('/'));
    } catch (err) {
        yield put(registerUserError(err));
    }
}

export function* loginUserOnFirebase() {

    // Select username from store
    console.log("loginUserOnFirebase")
    const user = yield select(makeSelectUser());
    try {
        const auth = firebase.auth();
        // Call our request helper (see 'utils/request')
        const data = yield call(
            [auth, auth.signInWithEmailAndPassword],
            user.email, user.password);
        console.log(data.user);
        localStorage.setItem('logged_in', 'true');
        yield put(loginUserSuccess(data.user));
        yield put(push('/'));
    } catch (err) {
        yield put(loginUserError(err));
    }
}

function* logoutUserSaga() {
    yield put(loginUserSuccess(initialState));
    yield put(push('/auth/login'));

}

/**
 * Root saga manages watcher lifecycle
 */
export function* registerUser() {
    yield takeLatest(REGISTER_NEW_USER, registerUserOnFirebase);
}

export function* loginUser() {
    yield takeLatest(LOGIN_USER, loginUserOnFirebase);
}

export function* logoutUserWatch() {
    yield takeLatest(LOGOUT_USER, logoutUserSaga);
}