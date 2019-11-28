import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import LoginSignupPage from "containers/LoginSignupPage/Loadable";
import DashboardPage from "containers/DashboardPage/Loadable";
import ReaderPage from "containers/ReaderPage";
import AuthenticatedRoute from "components/AuthenticatedRoute/AuthenticatedRoute";

function RootRoutes() {
    return (
        <div style={{height: "100%", width: "100%"}}>
            <Switch>
                <Route path="/auth" component={LoginSignupPage}/>
                <AuthenticatedRoute exact path="/reader/:id" component={ReaderPage}/>
                <AuthenticatedRoute exact path="/" component={DashboardPage}/>
                <Redirect to={"/auth"}/>
            </Switch>
        </div>
    );
}

export default RootRoutes;