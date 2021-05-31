import React, {useContext, useEffect, useRef, useState} from 'react';
import {CirclePicker} from "react-color";
import {GalleryColorContext} from "../../contexts/GalleryColorContext";

function TagBar(props) {
    const newTagNameRef = useRef(null)
    const { showColorDropdown, setShowColorDropdown,
            selectedColor, setSelectedColor,
            availableColors, setAvailableColors } = useContext(GalleryColorContext)
    const [existingTags, setExistingTags] = useState([
        {id: 1, tagName: "First", color: "#e91e63"},
        {id: 2, tagName: "Second", color: "#795548"},
        {id: 3, tagName: "Third", color: "#2196f3"},
        {id: 4, tagName: "Forth", color: "#4caf50"},
        {id: 5, tagName: "Fifth", color: "#673ab7"},
        {id: 6, tagName: "Sixth", color: "#ff9800"},
    ])

    useEffect(() => {
        const usedColors = existingTags.map((tag) => tag.color)
        if (usedColors) {
            setAvailableColors((availableColors) => availableColors.filter(color => !usedColors.includes(color)))
        }

    }, [existingTags, selectedColor])

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
                    setSelectedColor(availableColors[0] === selectedColor ? availableColors[1] : availableColors[0] )
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
