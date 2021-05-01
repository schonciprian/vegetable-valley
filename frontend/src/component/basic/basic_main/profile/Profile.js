import React, {useContext, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
// Components
import ProfileData from "./ProfileData";
import Password from "./Password";
import Delete from "./Delete";
// Contexts
import {UserContext} from "../../../../context/User";
// Helpers
import {authenticationFeedback, sweetalertSidePopup} from "../../../additionals/SweetAlert";
import {getRequest, putRequest} from "../../../additionals/Requests";
// Others
import profile_picture from "../../../../image/profile_picture/base_man.png";
// Stylesheets
import '../../../../stylesheet/basic/basic_main/Profile.css';

function Profile(props) {
    const [editableFields, setEditableFields] = useState(false);
    const [userData, setUserData] = useState({});
    const [user, setUser] = useContext(UserContext);
    const history = useHistory()

    useEffect(() => {
        const params = { username: user["username"] }
        getRequest('/api/get-user-data', params,
            (response) => setUserData(response.data),
            (error) => {
            if (error.response === undefined) {
                authenticationFeedback("Service unavailable", "Try again later, you are redirected to main page", "error", 4000, history)
                setTimeout(() => {history.push('/')}, 4000)
            }})
    }, [user])

    const handleInputChange = (event, key) => {
        setUserData(prevData => ({
            ...prevData,
            [key]: event.target.value
        }))
    }

    const updateUserData = () => {
        setEditableFields(!editableFields)
        putRequest('/api/update-user-data', userData, () => {
            sweetalertSidePopup("Personal data changed successfully", 1500)
            setUser(prevData => ({...prevData, username: userData.username}));
            window.sessionStorage.setItem("username", userData.username);
        }, (error) => {
            if (error.response === undefined) {
                authenticationFeedback("Service unavailable", "Try again later", "error", 3000, history)
            }})
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
