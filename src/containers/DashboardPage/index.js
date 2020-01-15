import React, {useEffect} from "react";
import DashboardHeader from "containers/DashboardPage/DashboardHeader";
import style from './style.module.scss'
import BookComponent from "components/BookComponent";
import PageTitle from "components/PageTitle";
import {useDispatch, useSelector} from "react-redux";
import {makeSelectBooksList, makeSelectSaveStatus} from "containers/DashboardPage/selectors";
import {fetchBooks, fetchPublicBooks, deleteBook} from "containers/DashboardPage/actions";
import {makeSelectUserId} from "containers/LoginSignupPage/selectors";
import {Spinner} from "react-bootstrap";
import LoadingIndicator from "components/LoadingIndicator";

function DashboardPage() {
    const dispatch = useDispatch();
    const {uid} = useSelector(makeSelectUserId());
    const fetchUserBooks = () => dispatch(fetchBooks());
    const dispatchDeleteBook = (id) => dispatch(deleteBook(id));
    const callFetchPublicBooks = () => dispatch(fetchPublicBooks());
    useEffect(() => {
        fetchUserBooks();
        callFetchPublicBooks();
    }, [uid]);
    const {loading, error} = useSelector(makeSelectSaveStatus());
    const {books, publicBooks} = useSelector(makeSelectBooksList());
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
                            books.map((book) => <BookComponent
                                key={book.id}
                                cover={book.cover}
                                title={book.title}
                                progress={60}
                                deleteBook={dispatchDeleteBook}
                                userId={book.userId}
                                id={book.id}
                            />) :
                            (
                                loading ? <div>Loading ...</div> : <div>No Books Found</div>
                            )
                    }
                </div>
                <div className={style.heading4}>Public Books {loading &&
                <Spinner size={'xs'} animation="grow" role="status"/>}</div>
                <div className={style.books} id="publicbooks">
                    {
                        publicBooks.length > 0 ? publicBooks.map((book) => <BookComponent key={book.id}
                                                                                          id={book.id}
                                                                                          userId={book.userId}
                                                                                          cover={book.cover}
                                                                                          title={book.title}
                                                                                          deleteBook={dispatchDeleteBook}
                                                                                          progress={60}/>
                        ) : (
                            loading ? <LoadingIndicator/> : <div>No Public Books Found</div>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default DashboardPage;
