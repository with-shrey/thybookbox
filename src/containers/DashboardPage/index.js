import React, {useEffect} from "react";
import DashboardHeader from "containers/DashboardPage/DashboardHeader";
import style from './style.module.scss'
import BookComponent from "components/BookComponent";
import PageTitle from "components/PageTitle";
import {useDispatch, useSelector} from "react-redux";
import {makeSelectBooksList, makeSelectSaveStatus} from "containers/DashboardPage/selectors";
import {fetchBooks} from "containers/DashboardPage/actions";
import {makeSelectUserId} from "containers/LoginSignupPage/selectors";
import {Spinner} from "react-bootstrap";
function DashboardPage() {
    const dispatch = useDispatch();
    const {uid} = useSelector(makeSelectUserId());
    const fetchUserBooks = () => dispatch(fetchBooks());
    useEffect(() => {
        fetchUserBooks();
    }, [uid]);
    const {loading, error} = useSelector(makeSelectSaveStatus());
    const {books} = useSelector(makeSelectBooksList());
    const publicBooks = [];//TODO: useSelector(makeSelectPublicBooksList());
    return (
        <div>
            <PageTitle>Dashboard</PageTitle>
            <DashboardHeader/>
            <div className={style.container}>
                <div className="error">{error}</div>
                <div className={style.heading4}>Your Books {loading &&
                <Spinner size={'xs'} animation="grow" role="status"/>}</div>
                <div className={style.books}>
                    {
                        books.length > 0 ?
                            books.map((book) => <BookComponent key={book.id} cover={book.cover} title={book.title}
                                                               progress={60} id={book.id}/>) :
                            (
                                loading ? <div>Loading ...</div> : <div>No Books Found</div>
                            )
                    }
                </div>
                <div className={style.heading4}>Public Books {loading &&
                <Spinner size={'xs'} animation="grow" role="status"/>}</div>
                <div className={style.books}>
                    {
                        publicBooks.length > 0 ? publicBooks.map((book) => <BookComponent key={book.id}
                                                                                          cover={book.cover}
                                                                                          title={book.title}
                                                                                          progress={60}/>
                        ) : (
                            loading ? <div>Loading ...</div> : <div>No Public Books Found</div>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default DashboardPage;