import React, { useState, createContext } from "react";

export const GalleryImagesContext = createContext(null);

export const GalleryImagesProvider = (props) => {
    const [listOfUserImages, setListOfUserImages] = useState([])
    const [selectedImagesToRemove, setSelectedImagesToRemove] = useState([])


    return (
        <GalleryImagesContext.Provider value={{
            listOfUserImages, setListOfUserImages,
            selectedImagesToRemove, setSelectedImagesToRemove
        }}>
            {props.children}
        </GalleryImagesContext.Provider>
    );
};

