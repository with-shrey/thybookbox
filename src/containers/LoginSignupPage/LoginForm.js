import React, {useEffect} from "react";
import style from './LoginSignupPage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {makeSelectUser, makeSelectAuthStatus} from "containers/LoginSignupPage/selectors";
import {loginUser, resetUserReducer, updateUserField} from "containers/LoginSignupPage/actions";
import ButtonComponent from 'components/ButtonComponent';
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import InPlaceLoader from "components/InPlaceLoader";

function LoginForm() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetUserReducer())
    });
    const {email, password} = useSelector(makeSelectUser());
    const {loading, error} = useSelector(makeSelectAuthStatus());
    const fieldChanged = (field) => (event) => dispatch(updateUserField(field, event.target.value));
    const handleSubmit = () => dispatch(loginUser());
    console.log(loading);
    return (
        <div className={style.translucentBox}>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h3 className={style.heading}>Login</h3>
            {
                error ? <div className={style.error}>{error}</div> : <div></div>
            }
            <form style={{textAlign: 'center'}}>
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
                {
                    loading ? (<InPlaceLoader
                        className={style.input}
                    />) : (
                        <ButtonComponent
                            className={style.input}
                            link={<div>Login</div>}
                            onClick={handleSubmit}
                        />
                    )
                }

            </form>
            Not Registered ? <Link to="/auth/register"> Register Now</Link>
        </div>
    );
}


export default LoginForm;