import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectSelectedBook = state => state.selectedBook || initialState;

const makeSelectSelectedBook = () =>
    createSelector(
        selectSelectedBook,
        bookState => bookState.selected,
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

export {selectSelectedBook, makeSelectSelectedBook, makeSelectSelectedBookStatus};