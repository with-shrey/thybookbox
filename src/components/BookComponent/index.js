import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import PropTypes from 'prop-types'
import LazyImage from "components/LazyImage";
import coverPlaceHolderImage from 'assets/images/BookComponent/bookCoverPlaceholder.png'
import {withRouter} from "react-router-dom";
import style from './ButtonComponent.module.scss';

let BookComponent = (props) => {
    return (
        <div className={style.imageWrapper} style={{height: '300px', width: '180px', cursor: 'pointer', margin: '10px'}}
             onClick={() => props.history.push(`/reader/${props.id}`)}>
            <div style={{height: '80%', position: 'relative'}}>
                {
                    localStorage.getItem('user_id') === props.userId &&
                    <button onClick={(e) => {
                        e.stopPropagation();
                        props.deleteBook(props.id);
                    }} className={style.deleteButton}
                            style={{position: 'absolute', top: 10, right: 20, zIndex: 1000}}>DELETE</button>
                }
                <LazyImage style={{height: '100%', width: '100%'}} srcPreload={coverPlaceHolderImage}
                           srcLoaded={props.cover}/>
            </div>
            <div style={{paddingTop: '20px'}}>{props.title}</div>
        </div>
    )
};
BookComponent = withRouter(BookComponent);
BookComponent.propTypes = {
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
};

export default BookComponent;
