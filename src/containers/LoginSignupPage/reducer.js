import produce from 'immer';
import {REGISTER_NEW_USER_ERROR, REGISTER_NEW_USER_SUCCESS, UPDATE_USER_FIELD} from './constants';

// The initial state of the App
export const initialState = {
    email: '',
    name: '',
    password: '',
    loading: false,
    error: ''
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case UPDATE_USER_FIELD:
                draft[action.field] = action.value;
                break;
            case REGISTER_NEW_USER_SUCCESS:
                draft.loading = false;
                break;
            case REGISTER_NEW_USER_ERROR:
                draft.loading = false;
                draft.error = action.error;
                break;
        }
    });

export default homeReducer;