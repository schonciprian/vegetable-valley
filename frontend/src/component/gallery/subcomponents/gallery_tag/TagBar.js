import React, {useContext, useEffect} from 'react';
import {CirclePicker} from "react-color";
import {GalleryColorContext} from "../../contexts/GalleryColorContext";
import {GalleryTagsContext} from "../../contexts/GalleryTagsContext";

function TagBar(props) {
    const {
        showColorDropdown, setShowColorDropdown,
        selectedColor, setSelectedColor,
        availableColors, setAvailableColors
    } = useContext(GalleryColorContext)
    const {newTagNameRef, existingTags, setExistingTags} = useContext(GalleryTagsContext)

    useEffect(() => {
        const usedColors = existingTags.map((tag) => tag.color)
        if (usedColors) {
            setAvailableColors((availableColors) => availableColors.filter(color => !usedColors.includes(color)))
        }
    }, [existingTags, selectedColor, setAvailableColors])

    const returnExistingTags = () => {
        return existingTags.map((tag, index) => (
            <div key={index} className="tag" style={{backgroundColor: tag.color}}>{tag.tagName}</div>
        ))
    }

    return (
        <div className="tag-bar">
            <div className="add-new-tag" style={availableColors.length === 0 ? {visibility: "hidden"} : {}}>
                <input type="text" ref={newTagNameRef} placeholder="Tag name"/>


                <div className="add-tag-button" onClick={() => {
                    const newItem = {tagName: newTagNameRef.current.value, color: selectedColor, imageId: []}
                    setExistingTags((prevData) => ([
                        ...prevData, newItem
                    ]))
                    setSelectedColor(availableColors[0] === selectedColor ? availableColors[1] : availableColors[0])
                }}>Add tag
                </div>

                <div className="color-dropdown">
                    <div className="color-dropdown-button"
                         style={{backgroundColor: selectedColor}}
                         onClick={() => setShowColorDropdown(!showColorDropdown)}>
                    </div>
                    <CirclePicker className="color-dropdown-content"
                                  circleSpacing={0}
                                  color={selectedColor}
                                  colors={availableColors}
                                  onChangeComplete={(color) => setSelectedColor(color.hex)}/>
                </div>
            </div>
            <div className="existing-tag">
                {returnExistingTags()}
            </div>
        </div>
    );
}

export default TagBar;
