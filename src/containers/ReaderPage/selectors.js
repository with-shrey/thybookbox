import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectSelectedBook = state => state.selectedBook || initialState;

const makeSelectSelectedBook = () =>
    createSelector(
        selectSelectedBook,
        bookState => bookState.selected,
    );
const makeSelectSelectedBookPageContent = () =>
    createSelector(
        selectSelectedBook,
        bookState => bookState.selected.pageContent,
    );
const makeSelectBookCustomization = () =>
    createSelector(
        selectSelectedBook,
        bookState => bookState.customization,
    );
const makeSelectSelectedBookStatus = () =>
    createSelector(
        selectSelectedBook,
        bookState => {
            return {
                loading: bookState.loading,
                error: bookState.error,
            }
        },
    );

export {
    selectSelectedBook,
    makeSelectSelectedBook,
    makeSelectSelectedBookStatus,
    makeSelectSelectedBookPageContent,
    makeSelectBookCustomization
};