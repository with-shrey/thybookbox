import React from "react";
import style from 'containers/DashboardPage/DashboardHeader/style.module.scss';
import logo from 'assets/images/logo/logo-full.png';

function DashboardHeader() {
    return (
        <div className={style.gridContainer}>
            <div><img className={style.logo} src={logo}/></div>
            <div><a>HOME</a></div>
            <div><a>LIBRARY</a></div>
            <div><a>ADD NEW</a></div>
            <div><a>SEARCH</a></div>
            <div><a></a></div>
            <div><a>USER</a></div>
        </div>
    )
}

export default DashboardHeader;