import React from "react";
import style from './SignupForm.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {makeSelectUser} from "containers/LoginSignupPage/selectors";
import {registerUser, updateUserField} from "containers/LoginSignupPage/actions";
import ButtonComponent from 'components/ButtonComponent';

function SignupForm() {
    const {email, name, password} = useSelector(makeSelectUser());
    const dispatch = useDispatch();
    const fieldChanged = (field) => (event) => dispatch(updateUserField(field, event.target.value));
    const handleSubmit = () => {
        console.log('Submit Click');
        dispatch(registerUser())
    };
    return (
        <div className={style.translucentBox}>
            <h3 className={style.heading}>REGISTER</h3>
            <form>
                <input
                    className={style.input}
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={fieldChanged('name')}
                />
                <input
                    className={style.input}
                    type="email"
                    placeholder="E-mail"
                    name="email" value={email}
                    onChange={fieldChanged('email')}/>
                <input
                    className={style.input}
                    type="password"
                    placeholder="Password"
                    name="email"
                    value={password}
                    onChange={fieldChanged('password')}/>
                <ButtonComponent
                    className={style.input}
                    Link={<div>REGISTER</div>}
                    onClick={handleSubmit}
                />
            </form>
        </div>
    );
}


export default SignupForm;