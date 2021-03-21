import React from 'react';
import axios from "axios";
import {environmentVariables} from "../../../../EnvironmentVariables";

function Delete(props) {
    const userData = props.userData;

    const deleteAccount = () => {
        async function fetchData() {
            await axios({
                method: "delete",
                url: `${environmentVariables.BACKEND_URL}/api/delete-user`,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json, text/plain, */*",
                    Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
                },
                data: userData
            }).then((res) => {
                console.log("success")
            }).catch((error) => {
                console.log(error.response.data);
            })
        }

        fetchData()
            .then(() => {
                window.sessionStorage.removeItem("token")
                window.sessionStorage.removeItem("username")
                window.location.replace("/")
            });
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