import React, {useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {environmentVariables} from "../../EnvironmentVariables";
import swal from "sweetalert";
import {UserContext} from "../../context/User";


function Logout(props) {
    const [, setUser] = useContext(UserContext);
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
        <Link to="/logout" onClick={logoutRequest}>Logout</Link>
    );
}

export default Logout;
