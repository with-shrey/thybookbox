import React from "react";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import SignupForm from "containers/LoginSignupPage/SignupForm";
import LoginForm from "containers/LoginSignupPage/LoginForm";
import UnauthenticatedRoute from "components/UnauthenticatedRoute";

function AuthRoutes(props) {
    return (
        <div style={{height: "100%", width: "100%"}}>
            <Switch>
                <UnauthenticatedRoute exact path={`${props.match.path}/login`} component={LoginForm}/>
                <UnauthenticatedRoute exact path={`${props.match.path}/register`} component={SignupForm}/>
                <Redirect to={`${props.match.path}/login`}/>
            </Switch>
        </div>
    );
}

export default withRouter(AuthRoutes);