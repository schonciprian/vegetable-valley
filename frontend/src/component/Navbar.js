import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/grow-guides">Grow Guides</Link>
            <Link to="/my-todos">My ToDos</Link>
            <Link to="/weather-forecast">Weather forecast</Link>
        </div>
    );
}

export default Navbar;