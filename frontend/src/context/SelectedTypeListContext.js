import React, { useState, createContext } from "react";

export const SelectedTypeListContext = createContext([]);

export const SelectedTypeListProvider = (props) => {
    const [selectedTypeList, setSelectedTypeList] = useState([]);

    return (
        <SelectedTypeListContext.Provider value={[selectedTypeList, setSelectedTypeList]}>
            {props.children}
        </SelectedTypeListContext.Provider>
    );
};