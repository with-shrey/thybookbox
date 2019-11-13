import {all, spawn, call} from "redux-saga/effects";
import {registerUser, loginUser} from 'containers/LoginSignupPage/saga';

export default function* rootSaga() {
    const sagas = [
        registerUser,
        loginUser
    ];

    yield all(sagas.map(saga =>
        spawn(function* () {
            while (true) {
                try {
                    yield call(saga);
                    break
                } catch (e) {
                    console.error(e)
                }
            }
        }))
    );

}