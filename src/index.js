import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/AppContainer/App';
import * as serviceWorker from 'serviceWorker';
import {Provider} from "react-redux";
import configureStore, {history} from "setup/redux/store";
import {ConnectedRouter} from "connected-react-router";
import 'scss/style.scss';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const render = Component => {
    firebase.initializeApp({
        apiKey: "AIzaSyB8fBz5udo_9qOxSuNJwDLJ7O19VsepFx0",
        authDomain: "tbbreader.firebaseapp.com",
        databaseURL: "https://tbbreader.firebaseio.com",
        projectId: "tbbreader",
        storageBucket: "tbbreader.appspot.com",
        messagingSenderId: "355552118700",
        appId: "1:355552118700:web:2ab54eda82ef4d28439c09"
    });
    return ReactDOM.render(
        <Provider store={configureStore()}>
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
    module.hot.accept('containers/AppContainer/App', () => {
        const NextApp = require('containers/AppContainer/App').default;
        render(NextApp);
    });
}
