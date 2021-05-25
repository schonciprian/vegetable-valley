import React, {useContext, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {UserContext} from "../../context/User";
// Helpers
import {postRequest} from "../additionals/Requests";
import {authenticationFeedbackPopUp, serviceUnavailablePopUp} from "../additionals/SweetAlert";
// Stylesheets
import '../../stylesheet/auth/Authentication.css';
import '../../stylesheet/error/Error.css';
import {FaSpinner} from "react-icons/fa";
//**************************************************//

export default function Login() {
    const [userData, setUserData] = useState({})
    const [, setUser] = useContext(UserContext);
    const passwordRef = useRef()

    const [errorMessages, setErrorMessages] = useState({});
    const [shakingInputFields, setShakingInputFields] = useState([])
    const [registrationLoading, setRegistrationLoading] = useState(false)

    const history = useHistory();

    const loginRequest = async () => {
        setRegistrationLoading(true);

        postRequest('/api/login', userData,
            (response) => {
                window.sessionStorage.setItem("token", response.data.token);
                window.sessionStorage.setItem("username", response.data.username);
                setUser({
                    "token": response.data.token,
                    "username": response.data.username,
                })
                authenticationFeedbackPopUp("Successfully logged in", "Welcome back! You are redirected to the main page", "success", 2000, history, '/')
                setRegistrationLoading(false);

            }, (error) => {
                if (error.response === undefined) {
                    serviceUnavailablePopUp("Service unavailable", "Try again later", 2000)
                    return;
                }

                setErrorMessages(error.response.data);
                setShakingInputFields(Object.keys(error.response.data))
                setTimeout(() => {
                    setShakingInputFields([])
                }, 1000)

                if (Object.keys(error.response.data).includes('failed')) {
                    removeUserData('password')
                    passwordRef.current.value = "";
                }
                setRegistrationLoading(false);
            })
    }

    const removeErrorMessage = (type) => {
        let errorMessagesCopy = {...errorMessages}
        delete errorMessagesCopy[type]
        setErrorMessages(errorMessagesCopy)
    }

    const removeUserData = (type) => {
        let userDataCopy = {...userData}
        delete userDataCopy[type]
        setUserData(userDataCopy)
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
                       className={
                           `${errorMessages.email ? 'error' : ""}` +
                           `${shakingInputFields.includes('email') ? ' input-error' : ""}`
                       }
                       type="email"
                       name="email"
                       placeholder="Enter your email"
                       onChange={(event) => setUserData(prevData => ({...prevData, email: event.target.value}))}
                       onClick={(event) => removeErrorMessage('email')}
                       required/>

                <label htmlFor="password">Password:</label><br/>
                {errorMessages.password && <div className="error-message">{errorMessages.password}</div>}
                <input id="password"
                       className={
                           `${errorMessages.password ? 'error' : ""}` +
                           `${shakingInputFields.includes('password') ? ' input-error' : ""}`
                       }
                       type="password"
                       name="password"
                       ref={passwordRef}
                       placeholder="Enter your password"
                       onChange={(event) => setUserData(prevData => ({...prevData, password: event.target.value}))}
                       onClick={(event) => removeErrorMessage('password')}
                       required/>

                {registrationLoading && <FaSpinner className="loading-spinner"/>}

                <button type="button" onClick={loginRequest}>Login</button>
            </form>
        </div>
    );
}
