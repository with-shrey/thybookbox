import React from 'react';
import RootRoutes from "routes/RootRoutes";
import * as firebase from "firebase/app";
import {loginUserSuccess, logoutUser} from "containers/LoginSignupPage/actions";
import {connect} from "react-redux";

function App(props) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            localStorage.setItem('logged_in', 'true');
            props.loginUserSuccess(user);

        } else {
            localStorage.removeItem('logged_in');
            props.logoutUser()

        }
    });
    return <div style={{height: '100vh'}}>
        <RootRoutes/>
    </div>;
}

export default connect(() => {
    return {}
}, {loginUserSuccess, logoutUser})(App);