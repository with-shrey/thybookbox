import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    makeSelectSelectedBook,
    makeSelectSelectedBookStatus,
    selectSelectedBook
} from "containers/ReaderPage/selectors";
import LoadingIndicator from "components/LoadingIndicator";
import {selectBook} from "containers/ReaderPage/actions";
import {matchPath} from "react-router-dom";
import defaultStyles from "./style";
import ReaderView from "containers/ReaderPage/ReaderView";
import ReaderHeader from "containers/ReaderPage/ReaderHeader";

function ReaderPage(props) {
    const match = matchPath(props.history.location.pathname, {
        path: '/reader/:id',
        exact: true,
        strict: false
    });
    const bookId = match.params.id;
    const dispatch = useDispatch();
    const {title, url} = useSelector(makeSelectSelectedBook());
    const {loading, error} = useSelector(makeSelectSelectedBookStatus());
    const [pageString, setPageString] = useState('/');
    const readerRef = useRef(null);
    const next = () => {
        const node = readerRef.current;
        node.nextPage();
    };

    const prev = () => {
        const node = readerRef.current;
        node.prevPage();
    };
    const dispatchSelectBook = (id) => dispatch(selectBook(id));
    useEffect(() => {
        dispatchSelectBook(bookId);
    }, [bookId]);
    console.log(url);
    return (
        <div style={{
            height: '100vh',
            maxWidth: '100vw',
            display: 'grid',
            gridTemplateRows: '80px auto',
            gridTemplateColumns: 'auto',
            justifyContent: 'center'
        }}>
            <ReaderHeader
                onPrevious={prev}
                onNext={next}
                pageText={pageString}
            />
            <div style={{height: "100%", width: '100vw', display: 'flex', justifyContent: 'center'}}>

                <div style={{height: "100%", width: '50vw'}}>
                    <ReaderView
                        url={url}
                        ref={readerRef}
                        loadingView={<LoadingIndicator/>}
                        pageChanged={({page, total}) => {
                            // console.log(page);
                            setPageString(`${page}/${total}`)
                        }}
                        // location={location}
                        // locationChanged={epubcifi => setLocation(epubcifi)}
                        tocChanged={toc => console.log(toc)}
                    />
                </div>
                {/*<div onClick={() => prev()}>Prev</div>*/}
                {/*<div onClick={() => next()}>Next</div>*/}
            </div>
        </div>
    )

}


export default ReaderPage;