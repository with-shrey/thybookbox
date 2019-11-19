import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectUser = state => state.user || initialState;

const makeSelectUserName = () =>
    createSelector(
        selectUser,
        userState => {
            return {
                name: userState.name
            }
        },
    );

export {selectUser, makeSelectUserName};