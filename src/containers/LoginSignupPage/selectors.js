import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectUser = state => state.user || initialState;

const makeSelectUser = () =>
    createSelector(
        selectUser,
        userState => {
            return {
                email: userState.email,
                password: userState.password,
                name: userState.name
            }
        },
    );
const makeSelectUserId = () =>
    createSelector(
        selectUser,
        userState => {
            return {
                uid: userState.uid,
            }
        },
    );
const makeSelectAuthStatus = () =>
    createSelector(
        selectUser,
        userState => {
            return {
                loading: userState.loading,
                error: userState.error
            }
        },
    );

export {selectUser, makeSelectUser, makeSelectAuthStatus, makeSelectUserId};