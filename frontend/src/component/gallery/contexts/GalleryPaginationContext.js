import React, { useState, createContext } from "react";

export const GalleryPaginationContext = createContext(null);

export const GalleryPaginationProvider = (props) => {
    const [imagePerPage, setImagePerPage] = useState(12)
    const [actualPageNumber, setActualPageNumber] = useState(1)

    return (
        <GalleryPaginationContext.Provider value={{
            imagePerPage, setImagePerPage,
            actualPageNumber, setActualPageNumber
        }}>
            {props.children}
        </GalleryPaginationContext.Provider>
    );
};
