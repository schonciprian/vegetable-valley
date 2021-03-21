import React from 'react';

function Password(props) {
    return (
        <div className="profile-page-password">
            <div className="profile-data-row">
                <div className="profile-data-key">Old password:</div>
                <input className="profile-data-value"
                       type="password"
                       placeholder="Old password"
                       onChange={(event) => {
                           console.log(event.target.value)
                       }}/>
            </div>
            <div className="profile-data-row">
                <div className="profile-data-key">New password:</div>
                <input className="profile-data-value"
                       type="password"
                       placeholder="New password"
                       onChange={(event) => {
                           console.log(event.target.value)
                       }}/>
            </div>
            <div className="profile-data-row">
                <div className="profile-data-key">New password again:</div>
                <input className="profile-data-value"
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
    );
}

export default Password;