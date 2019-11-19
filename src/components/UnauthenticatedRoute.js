import React from "react";
import {Redirect, Route} from "react-router-dom";

function UnauthenticatedRoute({component: Component, props: cProps, restProps}) {

    return <Route
        {...restProps}
        render={props =>
            !localStorage.getItem('logged_in')
                ? <Component {...props} {...cProps} />
                : <Redirect
                    to={`/`}
                />}
    />;
}

export default UnauthenticatedRoute;

