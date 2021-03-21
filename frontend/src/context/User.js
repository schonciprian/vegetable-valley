import React, { useState, createContext } from "react";

export const UserContext = createContext({});

export const UserProvider = (props) => {
    const [user, setUser] = useState({
        token: window.sessionStorage.getItem("token"),
        username: window.sessionStorage.getItem("username"),
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};