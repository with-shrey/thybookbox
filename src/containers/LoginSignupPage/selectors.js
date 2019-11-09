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

export {selectUser, makeSelectUser};