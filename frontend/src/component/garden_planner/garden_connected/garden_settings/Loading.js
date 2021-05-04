import React from 'react';
import {FaSpinner} from "react-icons/fa";

function Loading(props) {
    return (
        <div className="loading">
            <div>
                <FaSpinner className="loading-spinner"/>
                Loading...
            </div>
        </div>
    );
}

export default Loading;
