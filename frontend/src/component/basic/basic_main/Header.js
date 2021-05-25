import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import Logout from "../../auth/Logout";

// Helpers
import {UserContext} from "../../../context/User";

// Stylesheets
import '../../../stylesheet/basic/basic_main/Header.css';
//**************************************************//

function Header() {
    const [user] = useContext(UserContext);

    return (
        <div className="header">
            <div className="title">
                <Link to="/">Vegetable Valley</Link>
            </div>
            <div className="navbar">
                {/********************/}
                {/** Authentication **/}
                {/********************/}
                {!user["token"] && <Link to="/register">Registration</Link>}
                {!user["token"] && <Link to="/login">Login</Link>}

                {user["token"] && <Link to="/garden-planner">Garden Planner</Link>}

                {/***********************/}
                {/** Vegetable related **/}
                {/***********************/}
                {user["token"] && <Link to="/grow-guides">Grow Guides</Link>}

                {/*********************/}
                {/** Weather related **/}
                {/*********************/}
                {user["token"] && <div className="dropdown">
                    <button className="dropdown-button">Weather</button>
                    <div className="dropdown-content">
                        <Link to="/weather">Weather Summary</Link>
                        <Link to="/charts">Charts</Link>
                    </div>
                </div>}

                {user["token"] && <Link to="/notes">Notes</Link>}

                {/**********************/}
                {/** Profile settings **/}
                {/**********************/}
                {user["token"] && <div className="dropdown">
                    <button className="dropdown-button">{user["username"]}</button>
                    <div className="dropdown-content">
                        <Link to="/profile">Settings</Link>
                        <Link to="/user-images">Image</Link>
                        <Logout />
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Header;
