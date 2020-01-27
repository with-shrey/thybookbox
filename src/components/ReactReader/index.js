import React, {Component} from "react";
import {createGlobalStyle} from "styled-components";
import {ReactReader} from "./modules";
import {
    Container,
    ReaderContainer,
    Bar,
    LogoWrapper,
    Logo,
    GenericButton,
    CloseIcon,
    FontSizeButton,
    ButtonWrapper
} from "./Components";

const storage = global.localStorage || null;

const DEMO_URL =
    "https://gerhardsletten.github.io/react-reader/files/alice.epub";
const DEMO_NAME = "Alice in wonderland";

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
    position: absolute;
    height: 100%;
    width: 100%;
    color: #fff;
  }
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location:
                storage && storage.getItem("epub-location")
                    ? storage.getItem("epub-location")
                    : 2,
            localFile: null,
            localName: null,
            largeText: false
        };
        this.rendition = null;
    }

    onLocationChanged = location => {
        this.setState(
            {
                location
            },
            () => {
                console.log(location);
                storage && storage.setItem("epub-location", location);
            }
        );
    };

    getRendition = rendition => {
        // Set inital font-size, and add a pointer to rendition for later updates
        this.rendition = rendition;
    };

    render() {
        const {fullscreen, location, localFile, localName} = this.state;
        return (
            <Container>
                <GlobalStyle/>
                <ReaderContainer fullscreen={true}>
                    <ReactReader
                        url={localFile || DEMO_URL}
                        title={localName || DEMO_NAME}
                        location={location}
                        locationChanged={this.onLocationChanged}
                        getRendition={this.getRendition}
                    />
                </ReaderContainer>
            </Container>
        );
    }
}

export default App;
