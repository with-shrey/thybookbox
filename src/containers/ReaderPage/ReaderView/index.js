import React, {Component} from "react";
import PropTypes from "prop-types";
import EPub, {Contents} from "epubjs";
import defaultStyle from 'containers/ReaderPage/ReaderView/style';
import getCfiRange from "utils/getCfiRange";

class ReaderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            toc: []
        };
        this.viewerRef = React.createRef();
        this.location = props.location;
        this.book = this.rendition = this.prevPage = this.nextPage = null;
    }

    componentDidMount() {
        const {url, tocChanged} = this.props;
        // use empty options to avoid ArrayBuffer urls being treated as options in epub.js
        const epubOptions = {
            width: "100%",
            height: "100%",
        };
        this.book = new EPub(url, epubOptions);
        this.book.loaded.navigation.then(({toc}) => {
            this.setState(
                {
                    isLoaded: true,
                    toc: toc
                },
                () => {
                    tocChanged && tocChanged(toc);
                    this.initReader();
                }
            );
        });
        document.addEventListener("keydown", this.handleKeyPress, false);
    }

    componentWillUnmount() {
        this.book = this.rendition = this.prevPage = this.nextPage = null;
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }

    shouldComponentUpdate(nextProps) {
        const {customizations} = nextProps;

        if (customizations.fontUrl) {
            // Add Css to Head
        }
        if (customizations.fontFamily) {
            this.rendition.themes.font(customizations.fontFamily);
        }
        if (customizations.fontSize) {
            this.rendition.themes.override('font-size', customizations.fontSize);
        }
        if (customizations.fontColor) {
            this.rendition.themes.override('color', customizations.fontColor)
        }
        return true;
        // return !this.state.isLoaded || nextProps.location !== this.props.location || JSON.stringify(this.props.customizations) !== JSON.stringify(nextProps.customization);
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.location !== this.props.location &&
            this.location !== this.props.location
        ) {
            this.rendition.display(this.props.location);
        }
    }

    initReader() {
        const {toc} = this.state;
        const {location, epubOptions, getRendition, customizations} = this.props;
        const node = this.viewerRef.current;
        this.rendition = this.book.renderTo(node, {
            contained: true,
            width: "100%",
            height: "100%",
            spread: "none",
            ...epubOptions
        });
        this.rendition.themes.override("background", 'transparent');

        this.rendition.display(
            typeof location === "string" || typeof location === "number"
                ? location
                : toc[0].href
        );

        this.prevPage = () => {
            this.rendition.prev();
        };
        this.nextPage = () => {
            this.rendition.next();
        };
        this.book.loaded.cover.then((cover) => {
            console.log(cover)
            console.log(this.book.coverUrl().then(console.log));
        });

        this.rendition.on("locationChanged", this.onLocationChange);
        this.rendition.on('relocated', location => this.props.pageChanged(location.start.displayed));

        getRendition && getRendition(this.rendition);
    }

    onLocationChange = loc => {
        const {location, pageContentChanged} = this.props;
        const newLocation = loc && loc.start;
        if (location !== newLocation) {
            this.location = newLocation;
            pageContentChanged && pageContentChanged(newLocation);
        }
        const [a, b] = [this.rendition.currentLocation().start.cfi, this.rendition.currentLocation().end.cfi];
        this.book.getRange(getCfiRange(a, b)).then(range => {
            pageContentChanged && pageContentChanged(range.toString());
        })
    };

    renderBook() {
        const {styles} = this.props;
        return <div ref={this.viewerRef} style={styles.view}/>;
    }

    handleKeyPress = ({key}) => {
        key && key === "ArrowRight" && this.nextPage();
        key && key === "ArrowLeft" && this.prevPage();
    };

    render() {
        const {isLoaded} = this.state;
        const {loadingView, styles} = this.props;
        return (
            <div style={styles.viewHolder}>
                {(isLoaded && this.renderBook()) || loadingView}
            </div>
        );
    }
}

ReaderView.defaultProps = {
    loadingView: null,
    pageContentChanged: null,
    pageChanged: (pageJson) => {
    },
    tocChanged: null,
    styles: defaultStyle,
    epubOptions: {}
};

ReaderView.propTypes = {
    url: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(ArrayBuffer)
    ]),
    loadingView: PropTypes.element,
    location: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pageContentChanged: PropTypes.func,
    pageChanged: PropTypes.func,
    tocChanged: PropTypes.func,
    styles: PropTypes.object,
    epubOptions: PropTypes.object,
    getRendition: PropTypes.func
};

export default ReaderView;