import React, {useEffect} from "react";
import style from 'containers/LoginSignupPage/LoginSignupPage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {makeSelectUser, makeSelectAuthStatus} from "containers/LoginSignupPage/selectors";
import {registerUser, resetUserReducer, updateUserField} from "containers/LoginSignupPage/actions";
import ButtonComponent from 'components/ButtonComponent';
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import InPlaceLoader from "components/InPlaceLoader";
import generateSiteTitle from "utils/generateSiteTitle";
import PageTitle from "components/PageTitle";
import index from "./index.scss"

function SignupForm() {
  {/*
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetUserReducer())
    });
    const {email, name, password} = useSelector (makeSelectUser());
    const {loading, error} = useSelector(makeSelectAuthStatus());
    const fieldChanged = (field) => (event) => dispatch(updateUserField(field, event.target.value));
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(registerUser());*/}
        // Variables
  var signupButton = document.getElementById('signup-button'),
      loginButton = document.getElementById('login-button'),
      userForms = document.getElementById('user_options-forms')


  // Add event listener to the "Sign Up" button
  signupButton.addEventListener('click', () => {
    userForms.classList.remove('login-click')
    userForms.classList.add('signup-click')
  }, false)


  // Add event listener to the "Login" button
  loginButton.addEventListener('click', () => {
    userForms.classList.remove('signup-click')
    userForms.classList.add('login-click')
  }, false);
    return (
        {/* <div className={style.translucentBox}>
            <PageTitle>Register</PageTitle>
            <h3 className={style.heading}>REGISTER</h3>
            {
                error ? <div className={style.error}>{error}</div> : <div></div>
            }
            <form onSubmit={handleSubmit}>
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
                {
                    loading ? (<InPlaceLoader
                        className={style.input}
                    />) : (
                        <ButtonComponent
                            className={style.input}
                            link={<div>Register</div>}
                            onClick={handleSubmit}
                        />
                    )
                }
                <input type="submit" style={{display: 'none'}} value="submit"/>
            </form>
            Already Registered ? <Link to="/auth/login"> Login</Link>
        </div> */},
<section class="user">
 <div class="user_options-container">
  <div class="user_options-text">
   <div class="user_options-unregistered">
    <h2 class="user_unregistered-title">Don't have an account?</h2>
    <p class="user_unregistered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
    <button class="user_unregistered-signup" id="signup-button">Sign up</button>
   </div>

   <div class="user_options-registered">
    <h2 class="user_registered-title">Have an account?</h2>
    <p class="user_registered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
    <button class="user_registered-login" id="login-button">Login</button>
   </div>
  </div>

  <div class="user_options-forms" id="user_options-forms">
   <div class="user_forms-login">
    <h2 class="forms_title">Login</h2>
    <form class="forms_form">
     <fieldset class="forms_fieldset">
      <div class="forms_field">
       <input type="email" placeholder="Email" class="forms_field-input" required autofocus />
      </div>
      <div class="forms_field">
       <input type="password" placeholder="Password" class="forms_field-input" required />
      </div>
     </fieldset>

     <div class="forms_buttons">
      <button type="button" class="forms_buttons-forgot">Forgot password?</button>
      <input type="submit" value="Log In" class="forms_buttons-action"></input>
     </div>

    </form>
   </div>
   <div class="user_forms-signup">
    <h2 class="forms_title">Sign Up</h2>
    <form class="forms_form">
     <fieldset class="forms_fieldset">
      <div class="forms_field">
       <input type="text" placeholder="Full Name" class="forms_field-input" required />
      </div>
      <div class="forms_field">
       <input type="email" placeholder="Email" class="forms_field-input" required />
      </div>
      <div class="forms_field">
       <input type="password" placeholder="Password" class="forms_field-input" required />
      </div>
     </fieldset>
     <div class="forms_buttons">
      <input type="submit" value="Sign up" class="forms_buttons-action"></input>
     </div>
    </form>
   </div>
  </div>
 </div>
</section>
    );
}

export default SignupForm;
