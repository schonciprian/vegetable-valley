import React, {useState} from 'react';
import axios from "axios";
import {environmentVariables} from "../../../../EnvironmentVariables";

function Password(props) {
    const [passwordData, setPasswordData] = useState({});

    const handleInputChange = (event, key) => {
        setPasswordData(prevData => ({
            ...prevData,
            [key]: event.target.value
        }))
    }

    const updateUserPassword = () => {
        async function fetchData() {
            await axios({
                method: "put",
                url: `${environmentVariables.BACKEND_URL}/api/update-user-password`,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json, text/plain, */*",
                    Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
                },
                data: passwordData
            }).then((res) => {
                console.log(res.data.message);
                console.log("success")
            }).catch((error) => {
                console.log(error.response.data);
            })
        }

        fetchData();
    }

    return (
        <div className="profile-page-password">
            <div className="profile-data-row">
                <div className="profile-data-key">Current password:</div>
                <input id="current_password"
                       className="profile-data-value"
                       type="password"
                       placeholder="Current password"
                       onChange={(event) => {
                           handleInputChange(event, "current_password")
                       }}/>
            </div>
            <div className="profile-data-row">
                <div className="profile-data-key">New password:</div>
                <input id="new_password"
                       className="profile-data-value"
                       type="password"
                       placeholder="New password"
                       onChange={(event) => {
                           handleInputChange(event, "new_password")
                       }}/>
            </div>
            <div className="profile-data-row">
                <div className="profile-data-key">New password again:</div>
                <input id="new_password_confirmation"
                       className="profile-data-value"
                       type="password"
                       placeholder="New password again"
                       onChange={(event) => {
                           handleInputChange(event, "new_password_confirmation")
                       }}/>
            </div>

            <button className="change-password-button" onClick={updateUserPassword}>
                Save
            </button>
        </div>
    );
}

export default Password;