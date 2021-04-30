import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";
import axios from "axios";
import {environmentVariables} from "../../../../EnvironmentVariables";
import {ActualGardenIdContext} from "../ActualGardenId";
import {sweetalertSidePopup} from "../../../additionals/SweetAlert";

function GardenSelection(props) {
    const gardenTitleRef = useRef();

    const [gardenName, setGardenName] = useState('')
    const [gardenTemporaryName, setGardenTemporaryName] = useState(gardenName)

    const [editableTitle, setEditableTitle] = useState(false)
    const [inputError, setInputError] = useState(false)
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
    const [actualGardenId, setActualGardenId] = useContext(ActualGardenIdContext)


    useEffect(() => {
        if (actualGardenId === null) return
        axios({
            method: "get",
            url: `${environmentVariables.BACKEND_URL}/api/get-garden-name`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
            params: {
                garden_id: actualGardenId,
            },
        }).then((res) => {
            setGardenName(res.data[0].garden_name)
            setGardenTemporaryName(res.data[0].garden_name)
        }).catch((error) => {
            console.log(error.response.data)
        })

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [gardenName, handleClickOutside, actualGardenId])



    const handleGardenNameChange = (event) => {
        setGardenTemporaryName(event.target.value)
    }

    const handleKeyPress = (event) => {
        const gardenNewName = event.target.value;

        if (event.key === "Enter") {
            if (gardenNewName.length > 0) {
                saveNewGardenNameToDB(gardenNewName)
            } else {
                setInputError(true)
            }
        }
    }
    const saveNewGardenNameToDB = (gardenNewName) => {
        axios({
            method: "put",
            url: `${environmentVariables.BACKEND_URL}/api/update-garden-name`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
            data: {
                garden_id: actualGardenId,
                new_garden_name: gardenNewName,
            }
        }).then((res) => {
            setGardenName(gardenNewName)
            setGardenTemporaryName(gardenNewName)
            setEditableTitle(false)
            setInputError(false)
            sweetalertSidePopup("Garden's name successfully changed", 2000)
        }).catch((error) => {
            setInputError(true)
        })
    }

    const switchGarden = (type) => {
        let gardenIds = []
        axios({
            method: "get",
            url: `${environmentVariables.BACKEND_URL}/api/get-user-gardens`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
        }).then((res) => {
            gardenIds = res.data.map(garden => garden.id)
            const index = gardenIds.findIndex(id => id === actualGardenId)

            if (type === 'left' && !gardenIds[index-1]) {return setActualGardenId(gardenIds[gardenIds.length - 1])}
            if (type === 'right' && !gardenIds[index+1]) {return setActualGardenId(gardenIds[0])}
            setActualGardenId(gardenIds[type === 'left' ? index - 1 : index + 1])
        }).catch((error) => {
            console.log(error.response.data)
        })
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
                onChange={(event) => {
                    handleGardenNameChange(event)
                }}
            />
            <FaArrowAltCircleRight className="arrow" onClick={() => switchGarden('right')}/>
        </div>);
}

export default GardenSelection;
