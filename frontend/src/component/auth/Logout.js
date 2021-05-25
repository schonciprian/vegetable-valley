import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
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
            }, (error) => {
                if (error.response === undefined) {
                    authenticationFeedback("Service unavailable", "Try again later", "error", 4000)
                }
        })
    }

    return (
        <div onClick={logoutRequest}>Logout</div>
    );
}

export default Logout;
