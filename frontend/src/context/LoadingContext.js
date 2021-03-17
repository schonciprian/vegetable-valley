import React, { useState, createContext } from "react";

export const LoadingContext = createContext(false);

export const LoadingProvider = (props) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={[loading, setLoading]}>
            {props.children}
        </LoadingContext.Provider>
    );
};