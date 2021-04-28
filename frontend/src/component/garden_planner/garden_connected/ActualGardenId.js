import React, { useState, createContext } from "react";

export const ActualGardenIdContext = createContext(1);

export const ActualGardenIdProvider = (props) => {
    const [actualGardenId, setActualGardenId] = useState(1);

    return (
        <ActualGardenIdContext.Provider value={[actualGardenId, setActualGardenId]}>
            {props.children}
        </ActualGardenIdContext.Provider>
    );
};
