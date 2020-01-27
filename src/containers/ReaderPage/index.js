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
import defaultStyles from "containers/ReaderPage/ReaderPageStyle.module.scss";
import ReaderView from "containers/ReaderPage/ReaderView";
import ReaderHeader from "containers/ReaderPage/ReaderHeader";
import {Container, ReaderContainer} from "components/ReactReader/Components";
import {ReactReader} from "components/ReactReader/modules";
import {createGlobalStyle} from "styled-components";


const GlobalStyle = createGlobalStyle`
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;
    color: inherit;
    font-size: inherit;
    font-weight: 300;
    line-height: 1.4;
    word-break: break-word;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-size: 1.8rem;
    background: #333;
    position: absolute;
    height: 100%;
    width: 100%;
    color: #fff;
  }
`;

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
    const [location, setLocation] = useState(localStorage.getItem("epub-location") || 2);
    const [rendition, setRendition] = useState(null);

    const dispatchSelectBook = (id) => dispatch(selectBook(id));
    const dispatchGetReaderCustomization = () => dispatch(getReaderCustomization());
    const dispatchSetPageContent = (content) => dispatch(setPageContent(content));
    useEffect(() => {
        dispatchSelectBook(bookId);
    }, [bookId]);

    useEffect(() => {
        if (rendition) {
            if (customizations.fontUrl) {
                rendition.getContents().forEach(content => {
                    content.addStylesheet(customizations.fontUrl).then(console.log)
                })
            }
            if (customizations.fontFamily) {
                rendition.themes.font(customizations.fontFamily);
            }
            if (customizations.fontSize) {
                rendition.themes.override('font-size', customizations.fontSize);
            }
            if (customizations.fontColor) {
                rendition.themes.override('color', customizations.fontColor)
            } else {
                rendition.themes.override('color', 'inherit')
            }
        }
    }, [customizations.fontFamily, customizations.fontUrl, customizations.fontSize, customizations.fontColor, rendition]);

    const onLocationChanged = location => {
        localStorage && localStorage.setItem("epub-location", location);
        setLocation(location);
    };

    const getRendition = renditionInst => {
        // Set inital font-size, and add a pointer to rendition for later updates
        renditionInst.themes.override("background", 'transparent');
        setRendition(renditionInst);
    };
    /*



     */
    return (
        <Container>
            {
                customizations.soundClip &&
                <audio src={customizations.soundClip} autoPlay/>

            }
            <GlobalStyle/>
            <ReaderContainer fullscreen={true}>
                <ReactReader
                    backgroundColor={customizations.backgroundColor}
                    backgroundImage={customizations.backgroundImage}
                    getContent={(content) => {
                        console.log(content);
                        dispatchSetPageContent(content);
                        dispatchGetReaderCustomization();
                    }}
                    url={url || ""}
                    title={title || ""}
                    location={location}
                    locationChanged={onLocationChanged}
                    getRendition={getRendition}
                />
            </ReaderContainer>
        </Container>
    )

}


export default ReaderPage;
