import React from 'react';
import axios from "axios";

// Stylesheets
import '../../stylesheet/auth/Registration.css';
//**************************************************//

export default function Registration() {
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
            console.log(res.data);
        }).catch((error) => {
            console.log(error.response.data);
        })
    }

    return (
        <div className="form-container">
            <h1>Registration</h1>
            <form className="form">
                <label htmlFor="name">Name:</label><br/>
                <input id="name" className={} type="text" name="name" placeholder="Enter your name" required/>

                <label htmlFor="email">Email:</label><br/>
                <input id="email" type="email" name="email" placeholder="Enter your email" required/>

                <label htmlFor="password">Password:</label><br/>
                <input id="password" type="password" name="password" placeholder="Enter your password" required/>

                <label htmlFor="confirm_password">Password again:</label><br/>
                <input id="confirm_password" type="password" name="confirm_password" placeholder="Enter your password again" required/>

                <button type="button" onClick={registrationRequest}>Register</button>
            </form>
        </div>
    );
}