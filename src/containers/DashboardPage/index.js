import React from "react";
import DashboardHeader from "containers/DashboardPage/DashboardHeader";
import style from './style.module.scss'
import BookComponent from "components/BookComponent";
import PageTitle from "components/PageTitle";
function DashboardPage() {
    return (
        <div>
            <PageTitle>Dashboard</PageTitle>
            <DashboardHeader/>
            <div className={style.container}>
                <div className={style.heading4}>Your Books</div>
                <div className={style.books}>
                    <BookComponent cover={''} title={'Hello'} progress={60}/>
                </div>
                <div className={style.heading4}>Public Books</div>
                <div className={style.books}>
                    <BookComponent cover={''} title={'Hello'} progress={60}/>
                </div>
            </div>
        </div>

    )
}

export default DashboardPage;