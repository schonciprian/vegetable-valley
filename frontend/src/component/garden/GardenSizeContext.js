import React, { useState, createContext } from "react";

export const GardenSizeContext = createContext(null);

export const GardenSizeProvider = (props) => {
    const [gardenSize, setGardenSize] = useState({});

    return (
        <GardenSizeContext.Provider value={[gardenSize, setGardenSize]}>
            {props.children}
        </GardenSizeContext.Provider>
    );
};
