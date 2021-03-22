import React, {useContext, useEffect, useState} from 'react';
import profile_picture from "../../../../image/profile_picture/base_man.png";
import '../../../../stylesheet/basic/basic_main/Profile.css';
import axios from "axios";
import {environmentVariables} from "../../../../EnvironmentVariables";
import {UserContext} from "../../../../context/User";
import Password from "./Password";
import ProfileData from "./ProfileData";
import Delete from "./Delete";
import Swal from "sweetalert2";

function Profile(props) {
    const [editableFields, setEditableFields] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        axios({
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
    }, [user])

    const handleInputChange = (event, key) => {
        setUserData(prevData => ({
            ...prevData,
            [key]: event.target.value
        }))
    }

    const updateUserData = () => {
        setEditableFields(!editableFields)
        axios({
            method: "put",
            url: `${environmentVariables.BACKEND_URL}/api/update-user-data`,
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
                title: 'Personal data changed successfully',
                animation: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000,
            });

            setUser(prevData => ({
                ...prevData,
                username: userData.username
            }));

            window.sessionStorage.setItem("username", userData.username);
        }).catch((error) => {
            console.log(error.response.data);
        })
    }

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

                    {!editableFields
                        ? <button onClick={() => setEditableFields(!editableFields)}>Edit</button>
                        : <button onClick={updateUserData}>Save</button>
                    }
                </div>
            </div>

            <div className="profile-page-important">
                <Password/>

                <Delete userData={userData}/>
            </div>

        </div>
    );
}

export default Profile;