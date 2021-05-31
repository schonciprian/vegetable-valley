import React, { useState, createContext } from "react";

export const GalleryColorContext = createContext(null);

export const GalleryColorProvider = (props) => {
    const [showColorDropdown, setShowColorDropdown] = useState(false)
    const [selectedColor, setSelectedColor] = useState("#f44336")
    const [availableColors, setAvailableColors] = useState([
        "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688",
        "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"])

    return (
        <GalleryColorContext.Provider value={{
            showColorDropdown, setShowColorDropdown,
            selectedColor, setSelectedColor,
            availableColors, setAvailableColors
        }}>
            {props.children}
        </GalleryColorContext.Provider>
    );
};

