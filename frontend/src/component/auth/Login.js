import React, {useContext, useState} from 'react';
import { useHistory } from "react-router-dom";
import {UserContext} from "../../context/User";
// Helpers
import {removeError, handleShakingError} from "./AuthenticationHelper";
import {postRequest} from "../additionals/Requests";
import {authenticationFeedback} from "../additionals/SweetAlert";
// Stylesheets
import '../../stylesheet/auth/Authentication.css';
import '../../stylesheet/error/Error.css';
//**************************************************//

export default function Login() {
    const [errorMessages, setErrorMessages] = useState({});
    const [, setUser] = useContext(UserContext);
    const history = useHistory();

    const getUserData = () => {
        return {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        }
    }

    const loginRequest = async () => {
        const userData = getUserData();
        postRequest('/api/login', userData,
            (response) => {
            window.sessionStorage.setItem("token", response.data.token);
            window.sessionStorage.setItem("username", response.data.username);
            setUser({
                "token": response.data.token,
                "username": response.data.username,
            })
                authenticationFeedback("Successfully logged in", "Welcome back! You are redirected to the main page", "success", 2000, history, '/')
        }, (error) => {
            if (error.response === undefined) {
                authenticationFeedback("Service unavailable", "Try again later", "error", 5000, history)
                return;
            }

            setErrorMessages(error.response.data);
            if (Object.keys(error.response.data)[0] === 'failed') {return document.getElementById("password").value = ""}
            Object.keys(error.response.data).forEach(error => {handleShakingError(error)})
        })
    }

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form className="form">
                {errorMessages.failed &&
                    <div id='auth_failed' className="error-message error-message-authentication">
                        {errorMessages.failed}
                    </div>}

                <label htmlFor="email">Email:</label><br/>
                {errorMessages.email && <div className="error-message">{errorMessages.email}</div>}
                <input id="email"
                       className={errorMessages.email ? "error" : ""}
                       type="email"
                       name="email"
                       placeholder="Enter your email"
                       onClick={(event) => removeError(event)}
                       required/>

                <label htmlFor="password">Password:</label><br/>
                {errorMessages.password && <div className="error-message">{errorMessages.password}</div>}
                <input id="password"
                       className={errorMessages.password ? "error" : ""}
                       type="password"
                       name="password"
                       placeholder="Enter your password"
                       onClick={(event) => removeError(event)}
                       required/>

                <button type="button" onClick={loginRequest}>Login</button>
            </form>
        </div>
    );
}
