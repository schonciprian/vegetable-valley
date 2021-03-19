import React, {useContext, useEffect, useState} from 'react';
import profile_picture from "../../../image/profile_picture/base_man.png";
import '../../../stylesheet/basic/basic_main/Profile.css';
import axios from "axios";
import {environmentVariables} from "../../../EnvironmentVariables";
import {UserContext} from "../../../context/User";

function Profile(props) {
    const [editableFields, setEditableFields] = useState(false);
    const [user] = useContext(UserContext);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        async function fetchData() {
            await axios({
                method: "get",
                url: `${environmentVariables.BACKEND_URL}/api/get-user-data`,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json, text/plain, */*",
                    Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
                },
                data: {name: user["name"]}
            }).then((res) => {
                setUserData(res.data);
            }).catch((error) => {
                console.log(error.response.data);
            })
        }

        fetchData();
    }, [user])

    const handleInputChange = (event, key) => {
        setUserData(prevData => ({
            ...prevData,
            [key]: event.target.value
        }))
    }

    return (
        <div className="profile-page-container">
            <h1>Profile settings</h1>
            <div className="profile-page-personal">
                <div className="profile-image">
                    <img src={profile_picture} alt=""/>
                </div>
                <div className="profile-data-container">
                    <div className="profile-data">
                        <div className="profile-data-row">
                            <div className="profile-data-key">Name:</div>
                            <input className={`profile-data-value ${editableFields ? "editableField" : undefined}`}
                                   placeholder="Name"
                                   value={userData.name}
                                   readOnly={!editableFields}
                                   onChange={(event) => {
                                       handleInputChange(event, "name")
                                   }}/>
                        </div>
                        <div className="profile-data-row">
                            <div className="profile-data-key">Email:</div>
                            <input className={`profile-data-value ${editableFields ? "editableField" : undefined}`}
                                   placeholder="Email"
                                   value={userData.email}
                                   readOnly={!editableFields}
                                   onChange={(event) => {
                                       handleInputChange(event, "email")
                                   }}/>
                        </div>
                    </div>

                    <button onClick={() => setEditableFields(!editableFields)}>
                        {!editableFields ? "Edit" : "Save"}
                    </button>
                </div>
            </div>

            <div className="delete-account">
                Delete your account
            </div>
        </div>
    );
}

export default Profile;