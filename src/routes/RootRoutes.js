import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import LoginSignupPage from "containers/LoginSignupPage/Loadable";
import AuthRoutes from "routes/AuthRoutes";

function RootRoutes() {
    return (
        <div style={{height: "100%", width: "100%"}}>
            <Switch>
                <Route path="/auth" component={LoginSignupPage}/>
                <Redirect to={"/auth"}/>
            </Switch>
        </div>
    );
}

export default RootRoutes;