import React, {useEffect} from "react";
import style from './LoginSignupPage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {makeSelectUser, makeSelectAuthStatus} from "containers/LoginSignupPage/selectors";
import {registerUser, resetUserReducer, updateUserField} from "containers/LoginSignupPage/actions";
import ButtonComponent from 'components/ButtonComponent';
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

function SignupForm() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetUserReducer())
    });
    const {email, name, password} = useSelector(makeSelectUser());
    const {loading, error} = useSelector(makeSelectAuthStatus());
    const fieldChanged = (field) => (event) => dispatch(updateUserField(field, event.target.value));
    const handleSubmit = () => dispatch(registerUser());
    return (
        <div className={style.translucentBox}>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <h3 className={style.heading}>REGISTER</h3>
            {
                error ? <div className={style.error}>{error}</div> : <div></div>
            }
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
            Already Registered ? <Link to="/auth/login"> Login</Link>
        </div>
    );
}


export default SignupForm;