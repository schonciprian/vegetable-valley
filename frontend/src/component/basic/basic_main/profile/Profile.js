import React, {useContext, useEffect, useState} from 'react';
import profile_picture from "../../../../image/profile_picture/base_man.png";
import '../../../../stylesheet/basic/basic_main/Profile.css';
import axios from "axios";
import {environmentVariables} from "../../../../EnvironmentVariables";
import {UserContext} from "../../../../context/User";

function Profile(props) {
    const [editableFields, setEditableFields] = useState(false);
    const [user, setUser] = useContext(UserContext);
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
                data: {username: user["username"]}
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

    const updateUserData = () => {
        setEditableFields(!editableFields)

        async function fetchData() {
            await axios({
                method: "put",
                url: `${environmentVariables.BACKEND_URL}/api/update-user-data`,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json, text/plain, */*",
                    Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
                },
                data: userData
            }).then((res) => {
                // window.sessionStorage.setItem("name", res.data.name);

                // setUser(prevData => ({
                //     ...prevData,
                //     name: res.data.name
                // }))
                // console.log("success")
            }).catch((error) => {
                console.log(error.response.data);
            })
        }

        fetchData();

        setUser(prevData => ({
            ...prevData,
            username: userData.username
        }))
        window.sessionStorage.setItem("username", userData.username);
    }

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


        // setUser(prevData => ({
        //     ...prevData,
        //     name: userData.name
        // }))
        // window.sessionStorage.setItem("name", userData.name);
    }

    // const createDate = () => {
    //     let date = new Date(userData.created_at);
    //     let year = date.getFullYear();
    //     let month = date.getMonth()+1;
    //     let dt = date.getDate();
    //
    //     if (dt < 10) {
    //         dt = '0' + dt;
    //     }
    //     if (month < 10) {
    //         month = '0' + month;
    //     }
    //
    //     return(year+'-' + month + '-'+dt);
    // }

    console.log(userData);

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
                            <div className="profile-data-key">First name:</div>
                            <input className={`profile-data-value ${editableFields ? "editableField" : undefined}`}
                                   placeholder="First name"
                                   value={userData.first_name ? userData.first_name : ""}
                                   readOnly={!editableFields}
                                   onChange={(event) => {
                                       handleInputChange(event, "first_name")
                                   }}/>
                        </div>
                        <div className="profile-data-row">
                            <div className="profile-data-key">Last name:</div>
                            <input className={`profile-data-value ${editableFields ? "editableField" : undefined}`}
                                   placeholder="Last name"
                                   value={userData.last_name ? userData.last_name : ""}
                                   readOnly={!editableFields}
                                   onChange={(event) => {
                                       handleInputChange(event, "last_name")
                                   }}/>
                        </div>



                        <div className="profile-data-row">
                            <div className="profile-data-key">Username:</div>
                            <input className={`profile-data-value ${editableFields ? "editableField" : undefined}`}
                                   placeholder="Username"
                                   value={userData.username ? userData.username : ""}
                                   readOnly={!editableFields}
                                   onChange={(event) => {
                                       handleInputChange(event, "username")
                                   }}/>
                        </div>
                        <div className="profile-data-row">
                            <div className="profile-data-key">Email:</div>
                            <input className={`profile-data-value ${editableFields ? "editableField" : undefined}`}
                                   placeholder="Email"
                                   value={userData.email ? userData.email : ""}
                                   readOnly={!editableFields}
                                   onChange={(event) => {
                                       handleInputChange(event, "email")
                                   }}/>
                        </div>
                        <div className="profile-data-row">
                            <div className="profile-data-key">Registration:</div>
                            <input className="profile-data-value"
                                   value={userData.created_at ? userData.created_at.split("T")[0] : ""}
                                   readOnly={true}/>
                        </div>
                    </div>

                    <button onClick={updateUserData}>
                        {!editableFields ? "Edit" : "Save"}
                    </button>
                </div>
            </div>

            <div className="profile-page-important">
                <div className="profile-page-password">
                    <div className="profile-data-row">
                        <div className="profile-data-key">Old password:</div>
                        <input className={`profile-data-value ${editableFields ? "editableField" : undefined}`}
                               type="password"
                               placeholder="Old password"
                               onChange={(event) => {
                                   console.log(event.target.value)
                               }}/>
                    </div>
                    <div className="profile-data-row">
                        <div className="profile-data-key">New password:</div>
                        <input className={`profile-data-value ${editableFields ? "editableField" : undefined}`}
                               type="password"
                               placeholder="New password"
                               onChange={(event) => {
                                   console.log(event.target.value)
                               }}/>
                    </div>
                    <div className="profile-data-row">
                        <div className="profile-data-key">New password again:</div>
                        <input className={`profile-data-value ${editableFields ? "editableField" : undefined}`}
                               type="password"
                               placeholder="New password again"
                               onChange={(event) => {
                                   console.log(event.target.value)
                               }}/>
                    </div>
                    <button className="change-password-button" onClick={(event) => {
                        console.log("save password")
                    }}>
                        Save
                    </button>
                </div>

                <div className="delete-account">
                    <h1>Delete Your Account</h1>
                    <button onClick={deleteAccount}>
                        Delete
                    </button>
                    <p>This action can not be reversed!</p>
                </div>
            </div>

        </div>
    );
}

export default Profile;