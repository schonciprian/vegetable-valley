import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
// Contexts
import {UserContext} from "../../../../context/User";
// Helpers
import {deleteRequest} from "../../../additionals/Requests";
import {authenticationFeedback, sweetalertSidePopup} from "../../../additionals/SweetAlert";

function Delete(props) {
    const userData = props.userData;
    const history = useHistory();
    const [, setUser] = useContext(UserContext);

    const deleteAccount = () => {
        deleteRequest('/api/delete-user', userData, () => {
            sweetalertSidePopup('Account deleted successfully', 2000)
            setTimeout(() => {
                history.push("/");
                window.sessionStorage.removeItem("token")
                window.sessionStorage.removeItem("username")
                setUser({"token": null, "username": null});
            }, 2000);
        }, (error) => {
            if (error.response === undefined) {
                authenticationFeedback("Service unavailable", "Try again later", "error", 3000)
            }
        })
    }

    return (
        <div className="delete-account">
            <h1>Delete Your Account</h1>
            <button onClick={deleteAccount}>
                Delete
            </button>
            <p>This action can not be reversed!</p>
        </div>
    );
}

export default Delete;
