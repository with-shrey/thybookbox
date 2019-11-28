import {call, put, select, takeLatest} from 'redux-saga/effects';
import {SELECT_BOOK} from "containers/ReaderPage/constants";


export function* getSelectedBookSaga() {

}


export default function* listenSelectedBook() {
    // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(SELECT_BOOK, getSelectedBookSaga);
}