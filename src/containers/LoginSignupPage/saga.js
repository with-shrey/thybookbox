import {call, put, select, takeLatest} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import {LOGIN_USER, REGISTER_NEW_USER} from "containers/LoginSignupPage/constants";
import {makeSelectUser} from "containers/LoginSignupPage/selectors";
import * as firebase from "firebase/app";
import {
    loginUserError,
    loginUserSuccess,
    registerUserError,
    registerUserSuccess
} from "containers/LoginSignupPage/actions";

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
        yield put(loginUserSuccess(data.user));
        yield put(push('/'));
    } catch (err) {
        yield put(loginUserError(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* registerUser() {
    // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(REGISTER_NEW_USER, registerUserOnFirebase);
}

export function* loginUser() {
    // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(LOGIN_USER, loginUserOnFirebase);
}