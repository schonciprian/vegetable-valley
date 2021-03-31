import React, {useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

// Helpers
import {UserContext} from "../../../context/User";
import {environmentVariables} from "../../../EnvironmentVariables";

// Stylesheets
import '../../../stylesheet/basic/basic_main/Header.css';
//**************************************************//

function Header() {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();

    const logoutRequest = () => {
        axios({
            method: "delete",
            url: `${environmentVariables.BACKEND_URL}/api/logout`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
        }).then((res) => {
            swal("Logged out successfully", "You are redirected to the main page");

            window.sessionStorage.removeItem("token");
            window.sessionStorage.removeItem("username");

            setTimeout(() => {
                history.push("/");
                swal.close();
                setUser({
                    "token": null,
                    "username": null,
                });
            }, 2000);

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
                {/********************/}
                {/** Authentication **/}
                {/********************/}
                {!user["token"] && <Link to="/register">Registration</Link>}
                {!user["token"] && <Link to="/login">Login</Link>}

                {/***********************/}
                {/** Vegetable related **/}
                {/***********************/}
                {user["token"] && <Link to="/grow-guides">Grow Guides</Link>}

                {/*********************/}
                {/** Weather related **/}
                {/*********************/}
                {user["token"] && <div className="dropdown">
                    <button className="dropdown-button">Weather</button>
                    <div className="dropdown-content">
                        <Link to="/weather-forecast">Weather Forecast</Link>
                        <Link to="/charts">Charts</Link>
                    </div>
                </div>}

                {/**********************/}
                {/** Profile settings **/}
                {/**********************/}
                {user["token"] && <div className="dropdown">
                    <button className="dropdown-button">{user["username"]}</button>
                    <div className="dropdown-content">
                        <Link to="/profile">Settings</Link>
                        <Link to="/logout" onClick={logoutRequest}>Logout</Link>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Header;