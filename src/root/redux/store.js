/*
 * store.js
 */

import {applyMiddleware, compose, createStore} from 'redux';
import {Reducers} from "src/root/redux/reducers";
import {createBrowserHistory} from 'history'
import {createSagaMiddleware} from 'redux-saga'
import {rootSaga} from "src/root/saga/rootSaga";
import {routerMiddleware} from 'connected-react-router'


const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const configureStore = () => {
    const store = createStore(Reducers(history),
        compose(
            reduxDevTools,
            applyMiddleware(
                sagaMiddleware,
                routerMiddleware(history), // for dispatching history actions
            ))
    );

    sagaMiddleware.run(rootSaga);

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./reducers', () => {
                store.replaceReducer(Reducers);
            });
        }
    }

    return store;
};

export default configureStore;