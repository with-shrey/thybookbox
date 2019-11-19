import React from "react";
import style from 'containers/DashboardPage/DashboardHeader/style.module.scss';
import logo from 'assets/images/logo/logo-full.png';
import Dropdown from "react-bootstrap/Dropdown";
import {useSelector} from "react-redux";
import {makeSelectUserName} from "containers/DashboardPage/selectors";
import * as firebase from "firebase/app";

function DashboardHeader() {
    const {name} = useSelector(makeSelectUserName());
    console.log(name)
    return (
        <div className={style.gridContainer}>
            <div><img className={style.logo} src={logo}/></div>
            <div><a>HOME</a></div>
            <div><a>LIBRARY</a></div>
            <div><a>ADD NEW</a></div>
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
    )
}

export default DashboardHeader;