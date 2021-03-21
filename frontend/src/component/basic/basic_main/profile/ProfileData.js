import React from 'react';

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
                       value={userData.created_at ? userData.created_at.split("T")[0] : ""}
                       readOnly={true}/>
            </div>
        </div>
    );
}

export default ProfileData;