import React, {useContext, useEffect, useState} from 'react';
import profile_picture from "../../../image/profile_picture/base_man.png";
import '../../../stylesheet/basic/basic_main/Profile.css';
import axios from "axios";
import {environmentVariables} from "../../../EnvironmentVariables";
import {UserContext} from "../../../context/User";

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
            name: userData.name
        }))
        window.sessionStorage.setItem("name", userData.name);
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
                window.sessionStorage.removeItem("name")
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
                                   value={userData.name ? userData.name : ""}
                                   readOnly={!editableFields}
                                   onChange={(event) => {
                                       handleInputChange(event, "name")
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

            <div className="delete-account">
                <button onClick={deleteAccount}>
                    Delete your account
                </button>
            </div>
        </div>
    );
}

export default Profile;