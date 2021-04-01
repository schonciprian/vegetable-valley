import React from 'react';
import moment from "moment";

function ProfileData(props) {
    const editableFields = props.editableFields;
    const userData = props.userData;
    const handleInputChange = props.handleInputChange;

    return (
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
                       value={userData.created_at
                           ? moment(userData.created_at).format('YYYY. MM. DD. dddd')
                           : ""}
                       readOnly={true}/>
            </div>
        </div>
    );
}

export default ProfileData;