import React from "react";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import LoginSignupPage from "containers/LoginSignupPage/Loadable";
import SignupForm from "containers/LoginSignupPage/SignupForm";

function AuthRoutes(props) {
    console.log(props);
    return (
        <div style={{height: "100%", width: "100%"}}>
            <Switch>
                <Route exact path={`${props.match.path}/login`} component={SignupForm}/>
                <Route exact path={`${props.match.path}/signup`} component={SignupForm}/>
            </Switch>
        </div>
    );
}

export default withRouter(AuthRoutes);