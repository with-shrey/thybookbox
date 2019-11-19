import React, {useState} from "react";
import style from 'containers/DashboardPage/DashboardHeader/style.module.scss';
import logo from 'assets/images/logo/logo-full.png';
import Dropdown from "react-bootstrap/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {makeSelectBookDialogOpen, makeSelectUserName} from "containers/DashboardPage/selectors";
import * as firebase from "firebase/app";
import BookUploadModalComponent from "containers/DashboardPage/BookUploadModalComponent";
import {uploadBookFieldUpdate} from "containers/DashboardPage/actions";

function DashboardHeader() {
    const dispatch = useDispatch();
    const {name} = useSelector(makeSelectUserName());
    return (
        <>
            <div className={style.gridContainer}>
                <div><img className={style.logo} src={logo}/></div>
                <div><a>HOME</a></div>
                <div><a>LIBRARY</a></div>
                <div><a onClick={() => dispatch(uploadBookFieldUpdate('dialogOpen', true))}>ADD NEW</a></div>
                <div className={style.search}><a>SEARCH</a></div>
                <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => firebase.auth().signOut()}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <BookUploadModalComponent/>
        </>
    )
}

export default DashboardHeader;