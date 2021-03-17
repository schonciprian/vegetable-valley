import React, {useState} from 'react';
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

    const getUserData = () => {
        return {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        }
    }

    const loginRequest = async () => {
        const userData = getUserData();
        await axios({
            method: "post",
            url: `${environmentVariables.BACKEND_URL}/api/login`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*"
            },
            data: userData
        }).then((res) => {
            window.sessionStorage.setItem("token", res.data.token);
            swal("Successfully logged in", "Welcome back! You are redirected to the main page", "success");
            setTimeout(() => {
                window.location.replace("/");
            }, 2000);

        }).catch((error) => {
            // Store the errors in errorMessages to represent them for the user
            setErrorMessages(error.response.data);

            // Toggle shaking style from the input field
            Object.keys(error.response.data).forEach(error => {
                // Shaking only allowed for input fields
                if (error !== 'failed') {
                    handleShakingError(error)
                } else {
                    // Set the password input field's value to empty after failed authentication
                    document.getElementById("password").value = "";
                }
            })
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