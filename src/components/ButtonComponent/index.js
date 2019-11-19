import React from "react";
import style from "components/ButtonComponent/Button.module.scss"

function ButtonComponent(props) {
    return (
        <div {...props} className={style.gradient}>
            <div className={style.text}>
                {props.link}
            </div>
        </div>
    )
}

export default ButtonComponent;