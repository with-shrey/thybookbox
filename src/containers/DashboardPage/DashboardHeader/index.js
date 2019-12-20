import React, {useState} from "react";
import style from 'containers/DashboardPage/DashboardHeader/style.module.scss';
import logo from 'assets/images/logo/logo-full.png';
import Dropdown from "react-bootstrap/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {makeSelectUserName} from "containers/DashboardPage/selectors";
import * as firebase from "firebase/app";
import BookUploadModalComponent from "containers/DashboardPage/BookUploadModalComponent";
import {uploadBookFieldUpdate} from "containers/DashboardPage/actions";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

function DashboardHeader() {
    const dispatch = useDispatch();
    const {name} = useSelector(makeSelectUserName());
    return (
        <>
            <div className={style.gridContainer}>
                <div><img className={style.logo} src={logo}/></div>
                <div><Link to={'/'}>HOME</Link></div>
                <div><a href="#publicbooks">LIBRARY</a></div>
                <div><a onClick={() => dispatch(uploadBookFieldUpdate('dialogOpen', true))}>ADD NEW</a></div>
                {/*<div className={style.search}><a href="#publicbooks">PUBLIC BOOKS</a></div>*/}
                <div className={style.logoutDiv}>
                    <Button variant="success" id="dropdown-basic">
                        {name}
                    </Button>
                    <div className={style.dropdown}>
                        <div onClick={() => firebase.auth().signOut()}>Logout</div>
                    </div>
                </div>
            </div>
            <BookUploadModalComponent/>
        </>
    )
}

export default DashboardHeader;