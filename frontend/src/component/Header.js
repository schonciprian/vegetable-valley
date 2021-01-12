import React from 'react';
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <div className="title">
                <Link to="/">Vegetable Valley</Link>
            </div>
            <div className="navbar">
                <Link to="/grow-guides">Grow Guides</Link>
                <Link to="/my-todos">My ToDos</Link>
                <Link to="/weather-forecast">Weather forecast</Link>
            </div>
        </div>
    );
}

export default Header;