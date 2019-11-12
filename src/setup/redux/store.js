import {applyMiddleware, compose, createStore} from 'redux';
import {combineAllReducers} from "setup/redux/reducers";
import {createBrowserHistory} from 'history'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "setup/saga/rootSaga";
import {routerMiddleware} from 'connected-react-router'


const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const configureStore = () => {
    const store = createStore(
        combineAllReducers(history),
        reduxDevTools ? compose(
            applyMiddleware(sagaMiddleware, routerMiddleware(history)),
            reduxDevTools
        ) : applyMiddleware(sagaMiddleware, routerMiddleware(history)),

    );

    sagaMiddleware.run(rootSaga);

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./reducers', () => {
                store.replaceReducer(combineAllReducers(history));
            });
        }
    }

    return store;
};

export default configureStore;