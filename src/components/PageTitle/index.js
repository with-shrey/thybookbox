import {Helmet} from "react-helmet";
import generateSiteTitle from "utils/generateSiteTitle";
import React from "react";
import * as PropTypes from 'prop-types';

function PageTitle(props) {
    return (
        <Helmet>
            <title>{generateSiteTitle(props.children)}</title>
        </Helmet>
    )
}

PageTitle.propTypes = {
    children: PropTypes.string.isRequired
};

export default PageTitle;