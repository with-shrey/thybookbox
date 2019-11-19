import React from "react";
import {Redirect, Route} from "react-router-dom";

function AuthenticatedRoute({component: Component, props: cProps, restProps}) {

    return <Route
        {...restProps}
        render={props =>
            localStorage.getItem('logged_in')
                ? <Component {...props} {...cProps} />
                : <Redirect
                    to={`/auth?redirect=${props.location.pathname}${props.location
                        .search}`}
                />}
    />;
}

export default AuthenticatedRoute;

