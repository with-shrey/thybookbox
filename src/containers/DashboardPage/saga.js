import {call, put, select, takeLatest} from 'redux-saga/effects';
import * as firebase from "firebase/app";
import {makeSelectUploadFile} from "containers/DashboardPage/selectors";
import {
    fetchBooks,
    fetchBooksFailure,
    fetchBooksSuccess, fetchPublicBooksFailure, fetchPublicBooksSuccess,
    saveBookFailure,
    saveBookSuccess,
    uploadBookFailure,
    uploadBookSuccess
} from "containers/DashboardPage/actions";
import {FETCH_BOOK, FETCH_PUBLIC_BOOK, SAVE_BOOK, UPLOAD_BOOK} from "containers/DashboardPage/constants";
import {makeSelectUserId} from "containers/LoginSignupPage/selectors";

export function* fetchUserBooks() {
    yield takeLatest(FETCH_BOOK, fetchUserBooksSaga);
}

function* fetchUserBooksSaga() {
    const {uid} = yield select(makeSelectUserId());
    const collection = firebase.firestore().collection('Books')
        .where("userId", "==", uid);
    try {
        let books = yield call([collection, collection.get]);
        books = books.docs.map(doc => {
            return {...doc.data(), id: doc.id}
        });
        yield put(fetchBooksSuccess(books));
    } catch (e) {
        console.trace();
        yield put(fetchBooksFailure(e));
    }
}

export function* fetchPublicBooks() {
    yield takeLatest(FETCH_PUBLIC_BOOK, fetchPublicBooksSaga);
}

function* fetchPublicBooksSaga() {
    const collection = firebase.firestore().collection('Books')
        .where("isPublic", "==", true);
    try {
        let books = yield call([collection, collection.get]);
        books = books.docs.map(doc => {
            return {...doc.data(), id: doc.id}
        });
        console.log(books);
        yield put(fetchPublicBooksSuccess(books));
    } catch (e) {
        console.trace();
        yield put(fetchPublicBooksFailure(e));
    }
}

export function* storeBook() {
    yield takeLatest(SAVE_BOOK, storeBookSaga);
}

function* storeBookSaga() {
    const {title, url, cover, isPublic} = yield select(makeSelectUploadFile());
    const {uid} = yield select(makeSelectUserId());
    console.log(title, url, cover, isPublic, uid);
    const collection = firebase.firestore().collection('Books');
    try {
        const book = yield call([collection, collection.add], {
            title,
            url,
            cover: cover || '',
            userId: uid,
            isPublic
        });
        yield put(saveBookSuccess());
        yield put(fetchBooks());
        yield call(fetchUserBooksSaga);
    } catch (e) {
        console.trace();
        yield put(saveBookFailure(e));
    }
}

export function* uploadBookSaga() {
    // Select username from store
    const {file} = yield select(makeSelectUploadFile());
    const name = `upload/${new Date().getMilliseconds()}-${file.name}`;
    const ref = firebase.storage().ref().child(name);
    try {
        // Call our request helper (see 'utils/request')
        const uploadResult = yield call([ref, ref.put], file);
        const downloadUrl = yield call([ref, ref.getDownloadURL]);
        yield put(uploadBookSuccess({url: `${downloadUrl}&format=xyz.epub`}));
    } catch (err) {
        yield put(uploadBookFailure(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* uploadBook() {
    // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(UPLOAD_BOOK, uploadBookSaga);
}
