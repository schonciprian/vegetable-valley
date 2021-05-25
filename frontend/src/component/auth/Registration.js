import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

// Helpers
import {postRequest} from "../additionals/Requests";
import {authenticationFeedbackPopUp, serviceUnavailablePopUp} from "../additionals/SweetAlert";

// Stylesheets
import '../../stylesheet/auth/Authentication.css';
import '../../stylesheet/error/Error.css';
import {FaSpinner} from "react-icons/fa";
//**************************************************//

export default function Registration() {
    const history = useHistory();
    const [userData, setUserData] = useState({})
    const [errorMessages, setErrorMessages] = useState({});
    const [shakingInputFields, setShakingInputFields] = useState([])
    const [registrationLoading, setRegistrationLoading] = useState(false)

    const registrationRequest = () => {
        setRegistrationLoading(true);
        postRequest('/api/register', userData,
            () => {
                authenticationFeedbackPopUp("Successfully registered", "You are redirected to login page", "success", 2000, history, '/login')
                setRegistrationLoading(false);
            },
            (error) => {
                if (error.response === undefined) {
                    serviceUnavailablePopUp("Service unavailable", "Try again later", 2000)
                    return;
                }

                setErrorMessages(error.response.data);

                setShakingInputFields(Object.keys(error.response.data))
                setTimeout(() => {
                    setShakingInputFields([])
                }, 1000)

                setRegistrationLoading(false);
            })
    }

    const removeErrorMessage = (type) => {
        let errorMessagesCopy = {...errorMessages}
        delete errorMessagesCopy[type]
        setErrorMessages(errorMessagesCopy)
    }


return (
    <div className="form-container">
        <h1>Registration</h1>
        <form className="form">
            <label htmlFor="first_name">First name:</label><br/>
            {errorMessages.first_name && <div className="error-message">{errorMessages.first_name}</div>}
            <input id="first_name"
                   className={
                       `${errorMessages.first_name ? 'error' : ""}` +
                       `${shakingInputFields.includes('first_name') ? ' input-error' : ""}`
                   }
                   placeholder="Enter your first name"
                   onChange={(event) => setUserData(prevData => ({...prevData, first_name: event.target.value}))}
                   onClick={() => removeErrorMessage('first_name')}/>

            <label htmlFor="last_name">Last name:</label><br/>
            {errorMessages.last_name && <div className="error-message">{errorMessages.last_name}</div>}
            <input id="last_name"
                   className={
                       `${errorMessages.last_name ? 'error' : ""}` +
                       `${shakingInputFields.includes('last_name') ? ' input-error' : ""}`
                   }
                   placeholder="Enter your last name"
                   onChange={(event) => setUserData(prevData => ({...prevData, last_name: event.target.value}))}
                   onClick={() => removeErrorMessage('last_name')}/>

            <label htmlFor="username">Username:</label><br/>
            {errorMessages.username && <div className="error-message">{errorMessages.username}</div>}
            <input id="username"
                   className={
                       `${errorMessages.username ? 'error' : ""}` +
                       `${shakingInputFields.includes('username') ? ' input-error' : ""}`
                   }
                   placeholder="Enter your username"
                   onChange={(event) => setUserData(prevData => ({...prevData, username: event.target.value}))}
                   onClick={() => removeErrorMessage('username')}/>

            <label htmlFor="email">Email:</label><br/>
            {errorMessages.email && <div className="error-message">{errorMessages.email}</div>}
            <input id="email"
                   className={
                       `${errorMessages.email ? 'error' : ""}` +
                       `${shakingInputFields.includes('email') ? ' input-error' : ""}`
                   }
                   placeholder="Enter your email"
                   onChange={(event) => setUserData(prevData => ({...prevData, email: event.target.value}))}
                   onClick={() => removeErrorMessage('email')}/>

            <label htmlFor="password">Password:</label><br/>
            {errorMessages.password && <div className="error-message">{errorMessages.password}</div>}
            <input id="password"
                   className={
                       `${errorMessages.password ? 'error' : ""}` +
                       `${shakingInputFields.includes('password') ? ' input-error' : ""}`
                   }
                   placeholder="Enter your password"
                   type="password"
                   onChange={(event) => setUserData(prevData => ({...prevData, password: event.target.value}))}
                   onClick={() => removeErrorMessage('password')}/>

            <label htmlFor="confirm_password">Password again:</label><br/>
            {errorMessages.confirm_password &&
            <div className="error-message">{errorMessages.confirm_password}</div>}
            <input id="confirm_password"
                   className={
                       `${errorMessages.confirm_password ? 'error' : ""}` +
                       `${shakingInputFields.includes('confirm_password') ? ' input-error' : ""}`
                   }
                   placeholder="Enter your password again"
                   type="password"
                   onChange={(event) => setUserData(prevData => ({...prevData, confirm_password: event.target.value}))}
                   onClick={() => removeErrorMessage('confirm_password')}/>

            {registrationLoading && <FaSpinner className="loading-spinner"/>}
            <button type="button" onClick={registrationRequest}>Register</button>
        </form>
    </div>
);
}
