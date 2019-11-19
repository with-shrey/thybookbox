import React, {Component} from 'react';
import './LazyImage.scss';

class LazyImage extends Component {

    constructor(props) {
        super(props);
        this.LazyImageHd = null;
    }

    componentDidMount() {

        const hdLoaderImg = new Image();

        hdLoaderImg.src = this.props.srcLoaded;

        hdLoaderImg.onload = () => {
            this.LazyImageHd.setAttribute(
                'style',
                `background-image: url('${this.props.srcLoaded}')`
            );
            this.LazyImageHd.classList.add('iron-image-fade-in');
        }

    };

    render() {
        return (
            <div className="iron-image-container">

                <div
                    className="iron-image-loaded"
                    ref={imageLoadedElem => this.LazyImageHd = imageLoadedElem}>
                </div>
                <div
                    className="iron-image-preload"
                    style={{backgroundImage: `url('${this.props.srcPreload}')`}}>
                </div>

            </div>
        )
    }

}

export default LazyImage;