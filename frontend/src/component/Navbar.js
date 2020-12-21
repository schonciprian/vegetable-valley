import React from 'react';
import { Link } from "react-router-dom";

function Navbar(props) {
    return (
        <div className="navbar">
            <Link to="/grow-guides">Grow Guides</Link>
            <Link to="/my-jobs">My Jobs</Link>
            <Link to="/weather-forecast">Weather forecast</Link>
        </div>
    );
}

export default Navbar;