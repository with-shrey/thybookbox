import {
    GET_READER_CUSTOMIZATION, GET_READER_CUSTOMIZATION_ERROR, GET_READER_CUSTOMIZATION_SUCCESS,
    SELECT_BOOK,
    SELECT_BOOK_ERROR,
    SELECT_BOOK_SUCCESS, SET_PAGE_CONTENT
} from "containers/ReaderPage/constants";

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
    return {
        type: SELECT_BOOK_ERROR,
        error: error.message
    };
}

export function setPageContent(pageContent) {
    return {
        type: SET_PAGE_CONTENT,
        pageContent: pageContent
    };
}

export function getReaderCustomization() {
    return {
        type: GET_READER_CUSTOMIZATION,
    };
}

export function getReaderCustomizationSuccess(customization) {
    return {
        type: GET_READER_CUSTOMIZATION_SUCCESS,
        customization
    };
}

export function getReaderCustomizationError(error) {
    return {
        type: GET_READER_CUSTOMIZATION_ERROR,
        error: error.message
    };
}