import {SELECT_BOOK, SELECT_BOOK_ERROR, SELECT_BOOK_SUCCESS} from "containers/ReaderPage/constants";

export function selectBook(bookId) {
    return {
        type: SELECT_BOOK,
        id: bookId
    };
}

export function selectBookSuccess(book) {
    return {
        type: SELECT_BOOK_SUCCESS,
        book
    };
}

export function selectBookError(error) {
    console.log(error);
    return {
        type: SELECT_BOOK_ERROR,
        error: error.message
    };
}