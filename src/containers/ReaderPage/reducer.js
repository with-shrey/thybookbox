import produce from 'immer';
import {SELECT_BOOK, SELECT_BOOK_ERROR, SELECT_BOOK_SUCCESS} from "containers/ReaderPage/constants";

// The initial state of the App
export const initialState = {
    loading: false,
    error: '',
    selected: {
        id: '',
        title: '',
        cover: '',
        url: ''
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
        }
    });

export default selectedBook;