import produce from 'immer';
import {
    GET_READER_CUSTOMIZATION,
    GET_READER_CUSTOMIZATION_ERROR, GET_READER_CUSTOMIZATION_SUCCESS,
    SELECT_BOOK,
    SELECT_BOOK_ERROR,
    SELECT_BOOK_SUCCESS, SET_PAGE_CONTENT
} from "containers/ReaderPage/constants";

// The initial state of the App
export const initialState = {
    loading: false,
    error: '',
    selected: {
        id: '',
        title: '',
        cover: '',
        url: '',
        pageContent: ''
    },
    customization: {
        fontSize: null,
        fontColor: null,
        backgroundColor: null,
        backgroundImage: null,
        soundClip: null,
        fontFamily: null,
        fontUrl: null
    }
};

/* eslint-disable default-case, no-param-reassign */
const selectedBook = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SELECT_BOOK:
                draft.loading = true;
                draft.selected.id = action.id;
                draft.error = '';
                break;
            case SELECT_BOOK_SUCCESS:
                draft.loading = false;
                draft.selected = action.book;
                break;
            case SELECT_BOOK_ERROR:
                draft.loading = false;
                draft.error = action.error;
                break;
            case GET_READER_CUSTOMIZATION_ERROR:
                draft.loading = false;
                draft.error = action.error;
                draft.customization = initialState.customization;
                break;
            case SET_PAGE_CONTENT:
                draft.selected.pageContent = action.pageContent;
                break;
            case GET_READER_CUSTOMIZATION:
                draft.loading = true;
                draft.error = '';
                break;
            case GET_READER_CUSTOMIZATION_SUCCESS:
                draft.loading = false;
                draft.customization = action.customization;
                break;
        }
    });

export default selectedBook;
