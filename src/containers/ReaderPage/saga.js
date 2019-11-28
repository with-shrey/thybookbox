import {call, put, select, takeLatest} from 'redux-saga/effects';
import {SELECT_BOOK} from "containers/ReaderPage/constants";
import * as firebase from "firebase";
import {makeSelectSelectedBook} from "containers/ReaderPage/selectors";
import {selectBookError, selectBookSuccess} from "containers/ReaderPage/actions";

export function* getSelectedBookSaga() {
    const selectedBook = yield select(makeSelectSelectedBook());
    console.log(selectedBook);
    const bookRef = firebase.firestore().collection('Books')
        .doc(selectedBook.id);
    try {
        let book = yield call([bookRef, bookRef.get]);
        if (book.exists) {
            book = {...book.data(), id: book.id};

            yield put(selectBookSuccess(book));
        } else {
            throw new Error('Book Not Found')
        }
    } catch (e) {
        console.trace();
        yield put(selectBookError(e));
    }
}


export default function* listenSelectedBook() {
    // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(SELECT_BOOK, getSelectedBookSaga);
}