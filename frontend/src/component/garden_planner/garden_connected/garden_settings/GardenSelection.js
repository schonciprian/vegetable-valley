import React, {useEffect, useRef, useState} from 'react';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";

function GardenSelection(props) {
    const gardenTitleRef = useRef();

    const [editableTitle, setEditableTitle] = useState(false)
    const [gardenName, setGardenName] = useState("Your garden")
    const [inputError, setInputError] = useState(false)
    const [gardenTemporaryName, setGardenTemporaryName] = useState(gardenName)

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [gardenName])

    const handleClickOutside = (e) => {
        if (gardenTitleRef.current && gardenTitleRef.current.contains(e.target)) {
            // inside click
            setEditableTitle(true);
            return;
        }
        // outside click
        setEditableTitle(false);
        setGardenTemporaryName(gardenName) // Change back temp value to original garden name
        setInputError(false)
    };

    const handleGardenNameChange = (event) => {
        setGardenTemporaryName(event.target.value)
    }

    const handleKeyPress = (event) => {
        const gardenNewName = event.target.value;

        if (event.key === "Enter") {
            if (gardenNewName.length > 0) {
                setGardenName(gardenNewName)
                setGardenTemporaryName(gardenNewName)
                setEditableTitle(false)
                setInputError(false)
            } else {
                setInputError(true)
            }
        }
    }
    return (
        <div className='garden-selection'>
            <FaArrowAltCircleLeft className="arrow"/>
            <input
                className={`profile-data-value ${editableTitle ? "editableField" : ""} ${inputError ? "error" : ""}`}
                placeholder="Your garden's name"
                value={editableTitle ? gardenTemporaryName : gardenName}
                maxLength={18}
                ref={gardenTitleRef}
                readOnly={!editableTitle}
                onKeyDown={event => handleKeyPress(event)}
                onChange={(event) => {
                    handleGardenNameChange(event)
                }}
            />
            <FaArrowAltCircleRight className="arrow"/>
        </div>);
}

export default GardenSelection;
