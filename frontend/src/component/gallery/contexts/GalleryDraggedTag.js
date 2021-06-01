import React, { useState, createContext } from "react";

export const GalleryDraggedTagContext = createContext(null);

export const GalleryDraggedTagProvider = (props) => {
    const [draggedTag, setDraggedTag] = useState({})

    return (
        <GalleryDraggedTagContext.Provider value={{
            draggedTag, setDraggedTag,
        }}>
            {props.children}
        </GalleryDraggedTagContext.Provider>
    );
};

