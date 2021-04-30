import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";
import {ActualGardenIdContext} from "./ActualGardenIdContext";
import {sweetalertSidePopup} from "../../additionals/SweetAlert";
import {getRequest, putRequest} from "../../additionals/Requests";

function GardenSelection(props) {
    // Refs
    const gardenTitleRef = useRef();
    // States
    const [gardenName, setGardenName] = useState('')
    const [gardenTemporaryName, setGardenTemporaryName] = useState(gardenName)
    const [editableTitle, setEditableTitle] = useState(false)
    const [inputError, setInputError] = useState(false)
    // Contexts
    const [actualGardenId, setActualGardenId] = useContext(ActualGardenIdContext)
    // Callbacks
    const handleClickOutside = useCallback((e) => {
        if (gardenTitleRef.current && gardenTitleRef.current.contains(e.target)) {
            // Clicking inside the garden's title
            setEditableTitle(true);
            return;
        }
        // Clicking outside the garden's title
        setEditableTitle(false);
        setGardenTemporaryName(gardenName) // Change back temp value to original garden name
        setInputError(false)
    }, [setEditableTitle, setGardenTemporaryName, setInputError, gardenName]);

    useEffect(() => {
        if (actualGardenId === null) return;

        const params = {garden_id: actualGardenId,}
        // Parameters: url, data, callbackSuccess, callbackError
        getRequest('/api/get-garden-name', params, (response) => {
            setGardenName(response.data[0].garden_name)
            setGardenTemporaryName(response.data[0].garden_name)
        }, (error) => console.log(error.response.data))

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [gardenName, handleClickOutside, actualGardenId])

    const saveNewGardenNameToDB = (gardenNewName) => {
        const data = {garden_id: actualGardenId, new_garden_name: gardenNewName,}

        // Parameters: url, data, callbackSuccess, callbackError
        putRequest('/api/update-garden-name', data, () => {
            setGardenName(gardenNewName)
            setGardenTemporaryName(gardenNewName)
            setEditableTitle(false)
            setInputError(false)
            sweetalertSidePopup("Garden's name successfully changed", 2000)
        }, () => setInputError(true))
    }

    const switchGarden = (type) => {
        // Parameters: url, params, callbackSuccess, callbackError
        getRequest('/api/get-user-gardens', {}, (response) => {
            const gardenIds = response.data.map(garden => garden.id)
            const index = gardenIds.findIndex(id => id === actualGardenId)

            if (type === 'left' && !gardenIds[index-1]) {return setActualGardenId(gardenIds[gardenIds.length - 1])}
            if (type === 'right' && !gardenIds[index+1]) {return setActualGardenId(gardenIds[0])}
            setActualGardenId(gardenIds[type === 'left' ? index - 1 : index + 1])
        }, (error) => console.log(error.response.data))
    }

    const handleKeyPress = (event) => {
        const gardenNewName = event.target.value;

        if (event.key === "Enter") {
            if (gardenNewName.length > 0) {saveNewGardenNameToDB(gardenNewName)}
            setInputError(true)
        }
    }

    return (
        <div className='garden-selection'>
            <FaArrowAltCircleLeft className="arrow" onClick={() => switchGarden('left')}/>
            <input
                className={`profile-data-value ${editableTitle ? "editableField" : ""} ${inputError ? "error" : ""}`}
                placeholder="Your garden's name"
                value={editableTitle ? gardenTemporaryName : gardenName}
                maxLength={18}
                ref={gardenTitleRef}
                readOnly={!editableTitle}
                onKeyDown={event => handleKeyPress(event)}
                onChange={(event) => {setGardenTemporaryName(event.target.value)}}
            />
            <FaArrowAltCircleRight className="arrow" onClick={() => switchGarden('right')}/>
        </div>);
}

export default GardenSelection;
