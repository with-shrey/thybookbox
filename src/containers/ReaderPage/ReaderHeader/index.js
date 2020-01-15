import React, {useState} from "react";
import style from 'containers/ReaderPage/ReaderHeader/style.module.scss';
import logo from 'assets/images/logo/logo-full.png';
import Dropdown from "react-bootstrap/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {makeSelectBookDialogOpen, makeSelectUserName} from "containers/DashboardPage/selectors";
import * as firebase from "firebase/app";
import BookUploadModalComponent from "containers/DashboardPage/BookUploadModalComponent";
import {uploadBookFieldUpdate} from "containers/DashboardPage/actions";
import Button from "react-bootstrap/Button";

function ReaderHeader(props) {
    const {name} = useSelector(makeSelectUserName());
    return (
        <>
            <div className={style.gridContainer}>
                <div><img className={style.logo} src={logo}/></div>
                <div onClick={props.onPrevious}>Previous</div>
                <div className={style.pageno}>{props.pageText}</div>
                <div onClick={props.onNext}>Next</div>
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

ReaderHeader.defaultProps = {
    pageText: '15/100'
};

export default ReaderHeader;