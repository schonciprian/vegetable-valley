import React from 'react';
import { Link } from "react-router-dom";

// Stylesheets
import '../../../stylesheet/basic/basic_main/Header.css';
//**************************************************//


function Header() {
    return (
        <div className="header">
            <div className="title">
                <Link to="/">Vegetable Valley</Link>
            </div>
            <div className="navbar">
                <Link to="/grow-guides">Grow Guides</Link>
                <Link to="/weather-forecast">Weather forecast</Link>
                <Link to="/register">Registration</Link>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Header;