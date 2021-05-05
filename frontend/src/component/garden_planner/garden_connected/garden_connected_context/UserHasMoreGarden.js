import React, { useState, createContext } from "react";

export const UserHasMoreGardenContext = createContext(null);

export const UserHasMoreGardenProvider = (props) => {
    const [userHasMoreGardens, setUserHasMoreGardens] = useState(false);

    return (
        <UserHasMoreGardenContext.Provider value={[userHasMoreGardens, setUserHasMoreGardens]}>
            {props.children}
        </UserHasMoreGardenContext.Provider>
    );
};
