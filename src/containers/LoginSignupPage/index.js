import React from "react";
import style from "./LoginSignupPage.module.scss";
import AuthRoutes from "routes/AuthRoutes";

function LoginSignupPage() {
    return (
        <div className={style.gridContainer}>
            <div className={style.formArea}>
                <AuthRoutes/>
            </div>
        </div>
    );
}

export default LoginSignupPage;