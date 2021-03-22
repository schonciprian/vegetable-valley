import React, {useState} from 'react';
import axios from "axios";
import {environmentVariables} from "../../../../EnvironmentVariables";
import * as Swal from "sweetalert2";
import {BiShow} from "react-icons/bi";

function Password(props) {
    const [passwordData, setPasswordData] = useState({});
    const [passwordShown, setPasswordShown] = useState({
        current_password: false,
        new_password: false,
        new_password_confirmation: false,
    });
    const [passwordError, setPasswordError] = useState({})

    const handlePasswordShownChange = (key) => {
        setPasswordShown(prevData => ({
            ...prevData,
            [key]: !passwordShown[key]
        }))
    }

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
                console.log("success")
                document.getElementById("current_password").value = "";
                document.getElementById("new_password").value = "";
                document.getElementById("new_password_confirmation").value = "";
                Swal.fire({
                    toast: true,
                    icon: 'success',
                    title: 'Password changed successfully',
                    animation: true,
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 3000,
                })
            }).catch((error) => {
                console.log(error.response.data);
                setPasswordError(error.response.data)
            })
        }

        fetchData();
    }

    return (
        <div className="profile-page-password">
            {passwordError.message ? <div className="error-message error-message-authentication">{passwordError.message}</div> : ""}
            <div className="profile-data-row">
                <div className="profile-data-key">Current password:</div>
                <input id="current_password"
                       className="profile-data-value"
                       type={passwordShown.current_password ? "text" : "password"}
                       placeholder="Current password"
                       onChange={(event) => {
                           handleInputChange(event, "current_password")
                       }}/>
                <BiShow className="show-icon"
                        onClick={() => handlePasswordShownChange("current_password")}/>
            </div>

            <div className="profile-data-row">
                <div className="profile-data-key">New password:</div>
                <input id="new_password"
                       className="profile-data-value"
                       type={passwordShown.new_password ? "text" : "password"}
                       placeholder="New password"
                       onChange={(event) => {
                           handleInputChange(event, "new_password")
                       }}/>
                <BiShow className="show-icon"
                        onClick={() => handlePasswordShownChange("new_password")}/>
            </div>

            <div className="profile-data-row">
                <div className="profile-data-key">New password again:</div>
                <input id="new_password_confirmation"
                       className="profile-data-value"
                       type={passwordShown.new_password_confirmation ? "text" : "password"}
                       placeholder="New password again"
                       onChange={(event) => {
                           handleInputChange(event, "new_password_confirmation")
                       }}/>
                <BiShow className="show-icon"
                        onClick={() => handlePasswordShownChange("new_password_confirmation")}/>
            </div>

            <button className="change-password-button" onClick={updateUserPassword}>
                Save
            </button>
        </div>
    );
}

export default Password;