import React, {useState, createContext, useRef} from "react";

export const GalleryTagsContext = createContext(null);

export const GalleryTagsProvider = (props) => {
    const newTagNameRef = useRef(null)

    const [existingTags, setExistingTags] = useState([
        {id: 1, tagName: "First", color: "#e91e63"},
        {id: 2, tagName: "Second", color: "#795548"},
        {id: 3, tagName: "Third", color: "#2196f3"},
        {id: 4, tagName: "Forth", color: "#4caf50"},
        {id: 5, tagName: "Fifth", color: "#673ab7"},
        {id: 6, tagName: "Sixth", color: "#ff9800"},
    ])

    return (
        <GalleryTagsContext.Provider value={{
            newTagNameRef,
            existingTags, setExistingTags
        }}>
            {props.children}
        </GalleryTagsContext.Provider>
    );
};

