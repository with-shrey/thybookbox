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


export default function SignupForm() {

{/*    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetUserReducer())
    });
    const {email, name, password} = useSelector (makeSelectUser());
    const {loading, error} = useSelector(makeSelectAuthStatus());
    const fieldChanged = (field) => (event) => dispatch(updateUserField(field, event.target.value));
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(registerUser());
}

    return (

         <div className={style.translucentBox}>
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
            Already Registered ? <Link to="/auth/login">Login</Link>
        </div>
    )
}
*/}


const SignUpButton = document.getElementById("SignUp");
const SignInButton = document.getElementById("SignIn");
const container = document.getElementById("container");

SignUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active")
});

SignInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active")
});


return(

  <div class="container" id="container">
    <div class="form-container sign-up-container">
      <form action="#">
        <h1>Sign Up</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <span>or use your email for registration</span>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
      </form>

    </div>
    <div class="form-container sign-in-container">
      <form action="#">
        <h1>Sign In</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <span>or use your email account</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>

      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To stay connected with us please login with your personal info</p>
          <button class="ghost" id="SignIn">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start your journey with us </p>
          <button class="ghost" id="SignUp">Sign Up</button>
        </div>
      </div>

    </div>
  </div>

  )
}
