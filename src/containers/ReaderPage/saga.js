import {call, put, select, takeLatest} from 'redux-saga/effects';
import {GET_READER_CUSTOMIZATION, SELECT_BOOK} from "containers/ReaderPage/constants";
import * as firebase from "firebase";
import axios from 'axios';
import {makeSelectSelectedBook, makeSelectSelectedBookPageContent} from "containers/ReaderPage/selectors";
import {
    getReaderCustomizationError,
    getReaderCustomizationSuccess,
    selectBookError,
    selectBookSuccess
} from "containers/ReaderPage/actions";

export function* getSelectedBookSaga(action) {
    const selectedBook = {
        id: action.id
    };
    console.log(selectedBook);
    const bookRef = firebase.firestore().collection('Books')
        .doc(selectedBook.id);
    try {
        let book = yield call([bookRef, bookRef.get]);
        if (book.exists) {
            book = {...book.data(), id: book.id};
            console.log(book);
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
    const url = 'https://thybookbox.com/api/reader/customization/';
    try {
        const response = yield call(axios.post, url, {
            text: pageContent
        });
        const responseData = response.data;
        const customization = {
            fontSize: responseData.fontSize,
            fontColor: responseData.fontColor,
            fontFamily: responseData.fontFamily,
            fontUrl: responseData.fontUrl,
            backgroundColor: responseData.backgroundColor,
            backgroundImage: responseData.backgroundImage,
            soundClip: responseData.soundClip,
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