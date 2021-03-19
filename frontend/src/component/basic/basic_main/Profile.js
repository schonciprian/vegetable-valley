import React, {useState} from 'react';
import profile_picture from "../../../image/profile_picture/base_man.png";
import '../../../stylesheet/basic/basic_main/Profile.css';

function Profile(props) {
    const [editableFields, setEditableFields] = useState(false);

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
                                   readOnly={!editableFields}/>
                        </div>
                        <div className="profile-data-row">
                            <div className="profile-data-key">Email:</div>
                            <input className={`profile-data-value ${editableFields ? "editableField" : undefined}`}
                                   placeholder="Email"
                                   readOnly={!editableFields}/>
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