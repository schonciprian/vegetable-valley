import React, {useContext, useEffect, useState} from 'react';
import profile_picture from "../../../../image/profile_picture/base_man.png";
import '../../../../stylesheet/basic/basic_main/Profile.css';
import axios from "axios";
import {environmentVariables} from "../../../../EnvironmentVariables";
import {UserContext} from "../../../../context/User";
import Password from "./Password";
import ProfileData from "./ProfileData";
import Delete from "./Delete";

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
                console.log("success")
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
                    <ProfileData editableFields={editableFields}
                                 userData={userData}
                                 handleInputChange={handleInputChange}/>

                    <button onClick={updateUserData}>
                        {!editableFields ? "Edit" : "Save"}
                    </button>
                </div>
            </div>

            <div className="profile-page-important">
                <Password />

                <Delete userData={userData}/>
            </div>

        </div>
    );
}

export default Profile;