import React, {useEffect} from "react";
import style from 'containers/LoginSignupPage/LoginSignupPage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {makeSelectUser, makeSelectAuthStatus} from "containers/LoginSignupPage/selectors";
import {loginUser, resetUserReducer, updateUserField} from "containers/LoginSignupPage/actions";
import ButtonComponent from 'components/ButtonComponent';
import {Link} from "react-router-dom";
import InPlaceLoader from "components/InPlaceLoader";
import PageTitle from "components/PageTitle";

function LoginForm() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetUserReducer())
    });
    const {email, password} = useSelector(makeSelectUser());
    const {loading, error} = useSelector(makeSelectAuthStatus());
    const fieldChanged = (field) => (event) => dispatch(updateUserField(field, event.target.value));
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginUser());
    };
    return (
        <div className={style.translucentBox}>
            <PageTitle>Login</PageTitle>
            <h3 className={style.heading}>Login</h3>
            {
                error ? <div className={style.error}>{error}</div> : <div></div>
            }
            <form style={{textAlign: 'center'}} onSubmit={handleSubmit}>
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
                <input type="submit" style={{display: 'none'}}/>

            </form>
            Not Registered ? <Link to="/auth/register"> Register Now</Link>
        </div>
    );
}


export default LoginForm;