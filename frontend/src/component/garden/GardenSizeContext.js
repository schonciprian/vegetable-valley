import React, { useState, createContext } from "react";

export const GardenSizeContext = createContext({rows: 5, columns: 6});

export const GardenSizeProvider = (props) => {
    const [gardenSize, setGardenSize] = useState({rows: 5, columns: 6});

    return (
        <GardenSizeContext.Provider value={[gardenSize, setGardenSize]}>
            {props.children}
        </GardenSizeContext.Provider>
    );
};