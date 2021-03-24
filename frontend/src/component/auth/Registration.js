import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

// Helpers
import {environmentVariables} from "../../EnvironmentVariables";
import {removeError, handleShakingError} from "./AuthenticationHelper";

// Stylesheets
import '../../stylesheet/auth/Authentication.css';
import '../../stylesheet/error/Error.css';
//**************************************************//

export default function Registration() {
    const [errorMessages, setErrorMessages] = useState({});
    const history = useHistory();

    const getUserData = () => {
        return {
            first_name: document.getElementById("first_name").value,
            last_name: document.getElementById("last_name").value,
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            confirm_password: document.getElementById("confirm_password").value,
        }
    }

    const registrationRequest = async () => {
        const userData = getUserData();
        await axios({
            method: "post",
            url: `${environmentVariables.BACKEND_DEPLOY_URL}/api/register`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*"
            },
            data: userData
        }).then((res) => {
            swal("Successfully registered", "You are redirected to login page", "success");
            setTimeout(() => {
                history.push("/login");
                swal.close();
            }, 2000);

        }).catch((error) => {
            // Store the errors in errorMessages to represent them for the user
            setErrorMessages(error.response.data);

            // Toggle shaking style from the input field
            Object.keys(error.response.data).forEach(error => {
                handleShakingError(error)
            })
        })
    }

    return (
        <div className="form-container">
            <h1>Registration</h1>
            <form className="form">
                <label htmlFor="first_name">First name:</label><br/>
                {errorMessages.first_name && <div className="error-message">{errorMessages.first_name}</div>}
                <input id="first_name"
                       className={errorMessages.first_name ? "error" : ""}
                       type="text"
                       name="first_name"
                       placeholder="Enter your first name"
                       onClick={(event) => removeError(event)}
                       required/>

                <label htmlFor="last_name">Last name:</label><br/>
                {errorMessages.last_name && <div className="error-message">{errorMessages.last_name}</div>}
                <input id="last_name"
                       className={errorMessages.last_name ? "error" : ""}
                       type="text"
                       name="last_name"
                       placeholder="Enter your last name"
                       onClick={(event) => removeError(event)}
                       required/>

                <label htmlFor="username">Username:</label><br/>
                {errorMessages.username && <div className="error-message">{errorMessages.username}</div>}
                <input id="username"
                       className={errorMessages.username ? "error" : ""}
                       type="text"
                       name="username"
                       placeholder="Enter your username"
                       onClick={(event) => removeError(event)}
                       required/>

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

                <label htmlFor="confirm_password">Password again:</label><br/>
                {errorMessages.confirm_password && <div className="error-message">{errorMessages.confirm_password}</div>}
                <input id="confirm_password"
                       className={errorMessages.confirm_password ? "error" : ""}
                       type="password"
                       name="confirm_password"
                       placeholder="Enter your password again"
                       onClick={(event) => removeError(event)}
                       required/>

                <button type="button" onClick={registrationRequest}>Register</button>
            </form>
        </div>
    );
}