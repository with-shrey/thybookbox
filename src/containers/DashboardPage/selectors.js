import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectUser = state => state.user || initialState;
const selectBooks = state => state.books || initialState;

const makeSelectUserName = () =>
    createSelector(
        selectUser,
        userState => {
            return {
                name: userState.name
            }
        },
    );

const makeSelectUploadFile = () =>
    createSelector(
        selectBooks,
        bookState => {
            return {
                title: bookState.book.title,
                cover: bookState.book.cover,
                url: bookState.book.url,
                file: bookState.book.file,
                isPublic: bookState.book.isPublic
            }
        },
    );
const makeSelectUploadStatus = () =>
    createSelector(
        selectBooks,
        bookState => {
            return {
                loading: bookState.book.loading,
                error: bookState.book.error
            }
        },
    );
const makeSelectSaveStatus = () =>
    createSelector(
        selectBooks,
        bookState => {
            return {
                loading: bookState.loading,
                error: bookState.error
            }
        },
    );

const makeSelectBooksList = () =>
    createSelector(
        selectBooks,
        bookState => {
            return {
                books: bookState.books || [],
                publicBooks: bookState.publicBooks || [],
            }
        },
    );
const makeSelectBookDialogOpen = () =>
    createSelector(
        selectBooks,
        bookState => {
            return {
                dialogOpen: bookState.book.dialogOpen,
            }
        },
    );

export {
    makeSelectUserName,
    makeSelectUploadFile,
    makeSelectSaveStatus,
    makeSelectUploadStatus,
    makeSelectBooksList,
    makeSelectBookDialogOpen
};