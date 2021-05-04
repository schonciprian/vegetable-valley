import React, {useContext, useEffect} from 'react';
// Components
import DownloadGarden from "./garden_settings/DownloadGarden";
// Contexts
import {ActualGardenIdContext} from "./garden_connected_context/ActualGardenIdContext";
import {GardenSizeContext} from "./garden_connected_context/GardenSizeContext";
// Icons
import {BsFillPlusCircleFill} from "react-icons/bs";
// Methods
import {deleteRequest, getRequest, postRequest, putRequest} from "../../additionals/Requests";
import {authenticationFeedback} from "../../additionals/SweetAlert";
import {AiFillDelete} from "react-icons/ai";


function GardenOptionContainer(props) {
    const gardenRef = props.gardenRef;
    const [actualGardenId, setActualGardenId] = useContext(ActualGardenIdContext)
    const [gardenSize, setGardenSize] = useContext(GardenSizeContext);

    useEffect(() => {
        if (!window.sessionStorage.getItem("token") || actualGardenId === null) return

        const params = {garden_id: actualGardenId};
        // Parameters: url, params, callbackSuccess, callbackError
        getRequest('/api/get-garden-size', params, (response) => {
            setGardenSize(prevData => ({
                ...prevData,
                rows: parseInt(response.data[0].row_count),
                columns: parseInt(response.data[0].column_count),
            }))
        }, (error) => {
            if (error.response === undefined) {
                authenticationFeedback("Service unavailable", "Try again later", "error", 3000)
            }
        })
    }, [setGardenSize, actualGardenId])

    const modifyGardenSize = (rows, columns) => {
        const data = {
            garden_id: actualGardenId,
            row_count: rows,
            column_count: columns,
        }
        putRequest('/api/update-garden-size', data,
            () => {
                setGardenSize(prevData => ({
                    ...prevData,
                    rows: rows,
                    columns: columns,
                }))
            },
            (error) => {
                if (error.response === undefined) {
                    authenticationFeedback("Service unavailable", "Try again later", "error", 3000)
                }
            }
        )
    }

    const addNewGarden = () => {
        postRequest('/api/add-new-garden', {},
            (response) => setActualGardenId(response.data.id),
            (error) => {
                if (error.response === undefined) {
                    authenticationFeedback("Service unavailable", "Try again later", "error", 3000)
                }
            })
    }

    const removeGarden = () => {
        deleteRequest('/api/remove-garden', {garden_id: actualGardenId},
            (response) => setActualGardenId(null),
            (error) => {
                if (error.response === undefined) {
                    authenticationFeedback("Service unavailable", "Try again later", "error", 3000)
                }
            })
    }

    return (
        <div className="garden-option-container">

            <DownloadGarden gardenRef={gardenRef} rows={gardenSize.rows} columns={gardenSize.columns}/>

            <button className="option" onClick={() => modifyGardenSize(gardenSize.rows + 1, gardenSize.columns)}>
                <BsFillPlusCircleFill/>
                <span>Add row</span>
            </button>

            <button className="option" onClick={() => modifyGardenSize(gardenSize.rows, gardenSize.columns + 1)}>
                <BsFillPlusCircleFill/>
                <span>Add column</span>
            </button>

            <button className="option" onClick={() => addNewGarden()}>
                <BsFillPlusCircleFill/>
                <span>New garden</span>
            </button>

            <div className="delete-option" onClick={() => removeGarden()}>
                <AiFillDelete/>
                <span className="tooltip-text">Remove currently selected garden</span>
            </div>

        </div>
    );
}

export default GardenOptionContainer;
