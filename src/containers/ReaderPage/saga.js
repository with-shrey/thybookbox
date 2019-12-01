import {call, put, select, takeLatest} from 'redux-saga/effects';
import {GET_READER_CUSTOMIZATION, SELECT_BOOK} from "containers/ReaderPage/constants";
import * as firebase from "firebase";
import {makeSelectSelectedBook, makeSelectSelectedBookPageContent} from "containers/ReaderPage/selectors";
import {
    getReaderCustomizationError,
    getReaderCustomizationSuccess,
    selectBookError,
    selectBookSuccess
} from "containers/ReaderPage/actions";

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


export function* listenSelectedBook() {
    yield takeLatest(SELECT_BOOK, getSelectedBookSaga);
}

function* getReaderCustomization() {
    const pageContent = yield select(makeSelectSelectedBookPageContent());
    console.log(pageContent);
    try {
        const customization = {
            fontSize: '12px',
            fontColor: '#7a93ff',
            fontFamily: null,
            fontUrl: null,
            backgroundColor: '#7fff46',
            backgroundImage: 'http://localhost:3000/static/media/logo-full.854ef618.png',
            soundClip: 'http://soundbible.com/mp3/tasmanian-devil-daniel_simon.mp3',
        };
        yield put(getReaderCustomizationSuccess(customization))
    } catch (e) {
        console.error(e);
        yield put(getReaderCustomizationError(e))
    }
}

export function* listenGetReaderCustomization() {
    yield takeLatest(GET_READER_CUSTOMIZATION, getReaderCustomization);
}