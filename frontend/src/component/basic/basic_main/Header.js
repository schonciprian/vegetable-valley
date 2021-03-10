import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

// Stylesheets
import '../../../stylesheet/basic/basic_main/Header.css';
//**************************************************//

function Header() {

    const logoutRequest = async () => {
        await axios({
            method: "delete",
            url: `http://127.0.0.1:8000/api/logout`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
        }).then((res) => {
            swal("Successfully logout", "You are redirected to the main page");
            setTimeout(() => {
                window.location.replace("/");
            }, 1000);
            window.sessionStorage.removeItem("token");

        }).catch((error) => {
            console.log(error.response.data)
        })
    }

    return (
        <div className="header">
            <div className="title">
                <Link to="/">Vegetable Valley</Link>
            </div>
            <div className="navbar">
                <Link to="/grow-guides">Grow Guides</Link>
                <Link to="/weather-forecast">Weather forecast</Link>
                {!window.sessionStorage.getItem("token") && <Link to="/register">Registration</Link>}
                {!window.sessionStorage.getItem("token") && <Link to="/login">Login</Link>}
                {window.sessionStorage.getItem("token") && <Link to="/logout" onClick={logoutRequest}>Logout</Link>}
            </div>
        </div>
    );
}

export default Header;