import React, {useContext} from 'react';
import axios from "axios";
import {environmentVariables} from "../../../../EnvironmentVariables";
import Swal from "sweetalert2";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../../../context/User";

function Delete(props) {
    const userData = props.userData;
    const history = useHistory();
    const [, setUser] = useContext(UserContext);

    const deleteAccount = () => {
        axios({
            method: "delete",
            url: `${environmentVariables.BACKEND_URL}/api/delete-user`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
            data: userData
        }).then((res) => {
            Swal.fire({
                toast: true,
                icon: 'success',
                title: 'Account deleted successfully',
                animation: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2000,
            });

            setTimeout(() => {
                history.push("/");

                window.sessionStorage.removeItem("token")
                window.sessionStorage.removeItem("username")

                setUser({
                    "token": null,
                    "username": null,
                });
            }, 2000);

        }).catch((error) => {
            console.log(error.response.data);
        })
    }

    return (
        <div className="delete-account">
            <h1>Delete Your Account</h1>
            <button onClick={deleteAccount}>
                Delete
            </button>
            <p>This action can not be reversed!</p>
        </div>
    );
}

export default Delete;