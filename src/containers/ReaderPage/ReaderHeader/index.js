import React, {useState} from "react";
import style from 'containers/ReaderPage/ReaderHeader/style.module.scss';
import logo from 'assets/images/logo/logo-full.png';
import Dropdown from "react-bootstrap/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {makeSelectBookDialogOpen, makeSelectUserName} from "containers/DashboardPage/selectors";
import * as firebase from "firebase/app";
import BookUploadModalComponent from "containers/DashboardPage/BookUploadModalComponent";
import {uploadBookFieldUpdate} from "containers/DashboardPage/actions";

function ReaderHeader(props) {
    const {name} = useSelector(makeSelectUserName());
    return (
        <>
            <div className={style.gridContainer}>
                <div><img className={style.logo} src={logo}/></div>
                <div onClick={props.onPrevious}>Previous</div>
                <div className={style.pageno}>{props.pageText}</div>
                <div onClick={props.onNext}>Next</div>
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

ReaderHeader.defaultProps = {
    pageText: '15/100'
};

export default ReaderHeader;