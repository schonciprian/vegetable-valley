import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

// Helpers
import {UserContext} from "../../../context/User";
import {environmentVariables} from "../../../EnvironmentVariables";

// Stylesheets
import '../../../stylesheet/basic/basic_main/Header.css';
//**************************************************//

function Header() {
    const [user] = useContext(UserContext);

    const logoutRequest = async () => {
        await axios({
            method: "delete",
            url: `${environmentVariables.BACKEND_URL}/api/logout`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
        }).then((res) => {
            swal("Logged out successfully", "You are redirected to the main page");
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
                {user["token"] && <Link to="/grow-guides">Grow Guides</Link>}
                {user["token"] && <Link to="/weather-forecast">Weather Forecast</Link>}
                {!user["token"] && <Link to="/register">Registration</Link>}
                {!user["token"] && <Link to="/login">Login</Link>}
                {user["token"] && <Link to="/profile">{user["name"]}</Link>}
                {user["token"] && <Link to="/logout" onClick={logoutRequest}>Logout</Link>}
            </div>
        </div>
    );
}

export default Header;