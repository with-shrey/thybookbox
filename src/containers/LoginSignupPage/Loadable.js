import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicatorComponent from "components/LoadingIndicator";

export default loadable(() => import('./index'), {
    fallback: <LoadingIndicatorComponent/>,
});