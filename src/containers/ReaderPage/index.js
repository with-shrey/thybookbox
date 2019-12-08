import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    makeSelectBookCustomization,
    makeSelectSelectedBook,
    makeSelectSelectedBookStatus,
    selectSelectedBook
} from "containers/ReaderPage/selectors";
import LoadingIndicator from "components/LoadingIndicator";
import {getReaderCustomization, selectBook, setPageContent} from "containers/ReaderPage/actions";
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
    /*
    {
        fontSize,
        fontColor,
        backgroundColor,
        backgroundImage,
        soundClip,
        fontFamily,
        fontUrl
    }
    */
    const customizations = useSelector(makeSelectBookCustomization());
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
    const dispatchGetReaderCustomization = () => dispatch(getReaderCustomization());
    const dispatchSetPageContent = (content) => dispatch(setPageContent(content));
    useEffect(() => {
        dispatchSelectBook(bookId);
    }, [bookId]);
    if (customizations.soundClip) {
        let a = new Audio(customizations.soundClip);
        console.log(a);
        a.play();
    }
    return (
        <div style={{
            height: '100vh',
            maxWidth: '100vw',
            display: 'grid',
            gridTemplateRows: '80px auto',
            gridTemplateColumns: 'auto',
            justifyContent: 'center',
            backgroundColor: customizations.backgroundColor || 'white',
            backgroundImage: `url(${customizations.backgroundImage})` || 'unset',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
        }}>
            <ReaderHeader
                onPrevious={prev}
                onNext={next}
                pageText={pageString}
            />
            <div style={{height: "100%", width: '100vw', display: 'flex', justifyContent: 'center'}}>

                <div style={{height: "100%", width: '70vw'}}>
                    {
                        url ? (
                            <ReaderView
                                url={url}
                                ref={readerRef}
                                loadingView={<LoadingIndicator/>}
                                pageChanged={({page, total}) => {
                                    setPageString(`${page}/${total}`)
                                }}
                                customizations={customizations}
                                pageContentChanged={newContent => {
                                    dispatchSetPageContent(newContent.trim());
                                    dispatchGetReaderCustomization();
                                }}
                            />
                        ) : <></>
                    }

                </div>
            </div>
        </div>
    )

}


export default ReaderPage;