import React, {useContext, useEffect} from 'react';
// Components
import DownloadGarden from "./garden_settings/DownloadGarden";
// Contexts
import {ActualGardenIdContext} from "./garden_connected_context/ActualGardenIdContext";
import {GardenSizeContext} from "./garden_connected_context/GardenSizeContext";
// Icons
import {AiFillDelete} from "react-icons/ai";
import {MdAddBox} from "react-icons/md";
// Methods
import {deleteRequest, getRequest, postRequest} from "../../additionals/Requests";
import {authenticationFeedback} from "../../additionals/SweetAlert";



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

            <div className="option" onClick={() => addNewGarden()}>
                <MdAddBox/>
                <span>Add garden</span>
            </div>

            <div className="option" onClick={() => removeGarden()}>
                <AiFillDelete/>
                <span>Remove garden</span>
            </div>

        </div>
    );
}

export default GardenOptionContainer;
