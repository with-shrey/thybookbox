import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import PropTypes from 'prop-types'
import LazyImage from "components/LazyImage";
import coverPlaceHolderImage from 'assets/images/BookComponent/bookCoverPlaceholder.png'

function BookComponent(props) {
    return (
        <div style={{height: '300px'}}>
            <div style={{height: '80%'}}>
                <LazyImage style={{height: '100%', width: '100%'}} srcPreload={coverPlaceHolderImage}
                           srcLoaded={props.cover}/>
            </div>
            <div>{props.title}</div>
            <div><ProgressBar now={props.progress}/></div>
        </div>
    )
}

BookComponent.propTypes = {
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
};

export default BookComponent;