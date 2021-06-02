import React, {useState, createContext, useRef, useEffect} from "react";
import {getRequest} from "../../additionals/Requests";

export const GalleryTagsContext = createContext(null);

export const GalleryTagsProvider = (props) => {
    const newTagNameRef = useRef(null)
    const [existingTags, setExistingTags] = useState([])
    const [activeFilterTag, setActiveFilterTag] = useState(null)

    useEffect(() => {
        getRequest("/api/get-tags", {},
            (response) => {
                setExistingTags(response.data)
            },
            () => {
            })
    }, [])

    return (
        <GalleryTagsContext.Provider value={{
            newTagNameRef,
            existingTags, setExistingTags,
            activeFilterTag, setActiveFilterTag
        }}>
            {props.children}
        </GalleryTagsContext.Provider>
    );
};

