import {all, spawn, call} from "redux-saga/effects";
import {registerUser, loginUser, logoutUserWatch} from 'containers/LoginSignupPage/saga';
import {uploadBook, storeBook, fetchUserBooks, fetchPublicBooks} from "containers/DashboardPage/saga";
import {listenSelectedBook, listenGetReaderCustomization} from "containers/ReaderPage/saga";

export default function* rootSaga() {
    const sagas = [
        registerUser,
        loginUser,
        uploadBook,
        storeBook,
        fetchUserBooks,
        listenSelectedBook,
        listenGetReaderCustomization,
        logoutUserWatch,
        fetchPublicBooks
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