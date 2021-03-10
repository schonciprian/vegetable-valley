import React, {useState} from 'react';
import axios from "axios";
import swal from 'sweetalert';

// Helper functions
import {removeError, removeShakingError} from "./AuthenticationHelper";

// Stylesheets
import '../../stylesheet/auth/Authentication.css';
//**************************************************//

export default function Registration() {
    const [errorMessages, setErrorMessages] = useState({});

    const getUserData = () => {
        return {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            confirm_password: document.getElementById("confirm_password").value,
        }
    }

    const registrationRequest = async () => {
        const userData = getUserData();
        await axios({
            method: "post",
            url: `http://127.0.0.1:8000/api/register`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*"
            },
            data: userData
        }).then((res) => {
            swal("Successfully registered", "You are redirected to the main page", "success");
            setTimeout(() => {
                window.location.replace("/");
            }, 2000);

        }).catch((error) => {
            // Store the errors in errorMessages to represent them for the user
            setErrorMessages(error.response.data);

            // Toggle shaking style from the input field
            Object.keys(error.response.data).forEach(error => {
                removeShakingError(error)
            })
        })
    }

    return (
        <div className="form-container">
            <h1>Registration</h1>
            <form className="form">
                <label htmlFor="name">Name:</label><br/>
                {errorMessages.name && <div className="error-message">{errorMessages.name}</div>}
                <input id="name"
                       className={errorMessages.name ? "error" : ""}
                       type="text"
                       name="name"
                       placeholder="Enter your name"
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