import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import configureStore, {history} from "root/redux/store";
import {ConnectedRouter} from "connected-react-router";

const render = Component => {
    return ReactDOM.render(
        <Provider store={configureStore}>
            <ConnectedRouter history={history}>
                <Component/>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    );
};

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    });
}
