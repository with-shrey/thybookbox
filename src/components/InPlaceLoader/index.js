import React from 'react';
import ButtonComponent from "components/ButtonComponent";
import style from 'components/InPlaceLoader/style.module.scss';

function InPlaceLoader(props) {
    return (
        <div
            {...props}
            style={{width: '100%', textAlign: 'center', ...props.style}}
        >
            <ButtonComponent
                style={{width: '80px', margin: 'auto'}}
                link={<div className={style.loader}/>}
            />
        </div>
    )
}

export default InPlaceLoader;