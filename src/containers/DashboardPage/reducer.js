import produce from 'immer';
import {
    FETCH_BOOK, FETCH_BOOK_ERROR, FETCH_BOOK_SUCCESS,
    SAVE_BOOK_ERROR,
    SAVE_BOOK_SUCCESS,
    UPLOAD_BOOK,
    UPLOAD_BOOK_ERROR,
    UPLOAD_BOOK_FIELD_UPDATE,
    UPLOAD_BOOK_SUCCESS
} from './constants';
import {SAVE_BOOK} from "containers/DashboardPage/constants";

// The initial state of the App
export const initialState = {
    loading: false,
    error: '',
    book: {
        dialogOpen: false,
        loading: false,
        error: '',
        file: {},
        title: '',
        cover: '',
        url: ''
    },
    books: []
};

/* eslint-disable default-case, no-param-reassign */
const bookReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case UPLOAD_BOOK:
                // Delete prefixed '@' from the github username
                draft.book.loading = true;
                draft.book.file = action.file;
                draft.book.title = action.file.name;
                draft.book.error = '';
                break;
            case UPLOAD_BOOK_SUCCESS:
                draft.book.loading = false;
                draft.book.error = '';
                draft.book.url = action.url;
                break;
            case UPLOAD_BOOK_ERROR:
                draft.book.loading = false;
                draft.book.error = action.error;
                break;
            case UPLOAD_BOOK_FIELD_UPDATE:
                draft.book[action.field] = action.value;
                break;
            case SAVE_BOOK:
                draft.loading = true;
                draft.error = '';
                break;
            case SAVE_BOOK_SUCCESS:
                draft.loading = false;
                draft.error = '';
                draft.book = initialState.book;
            case SAVE_BOOK_ERROR:
                draft.loading = false;
                draft.error = action.error;
                break;
            case FETCH_BOOK:
                draft.loading = true;
                draft.error = '';
                break;
            case FETCH_BOOK_SUCCESS:
                draft.loading = false;
                draft.books = action.books;
                break;
            case FETCH_BOOK_ERROR:
                draft.loading = false;
                draft.error = action.error;
                break;
        }
    });

export default bookReducer;