import React from "react";
import style from "components/ButtonComponent/Button.module.scss"

function ButtonComponent(props) {
    return (
        <div className={style.gradient} onClick={props.onClick}>
            <div className={style.text}>
                {props.Link}
            </div>
        </div>
    )
}

export default ButtonComponent;