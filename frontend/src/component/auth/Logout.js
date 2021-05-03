import React, {useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
// Context
import {UserContext} from "../../context/User";
// Helpers
import {deleteRequest} from "../additionals/Requests";
import {authenticationFeedback} from "../additionals/SweetAlert";


function Logout(props) {
    const [, setUser] = useContext(UserContext);
    const history = useHistory();

    const logoutRequest = () => {
        deleteRequest('/api/logout', {},
            () => {
                window.sessionStorage.removeItem("token");
                window.sessionStorage.removeItem("username");
                setUser({
                    "token": null,
                    "username": null,
                });
                authenticationFeedback("Logged out successfully", "You are redirected to the main page", "success", 2000, history, '/')
            }, () => {
        })
    }

    return (
        <Link to="/" onClick={logoutRequest}>Logout</Link>
    );
}

export default Logout;
