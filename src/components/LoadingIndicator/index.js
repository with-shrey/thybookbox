// @flow
import * as React from "react";
import './LoadingIndicator.scss';

function LoadingIndicator() {
    return (
        <div className="LoadingIndicator">
            <div className="LoadingWrapper">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingIndicator;
