import React, {useContext, useEffect} from 'react';
import DownloadGarden from "./garden_settings/DownloadGarden";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {getRequest, putRequest} from "../../additionals/Requests";
import {ActualGardenIdContext} from "./garden_connected_context/ActualGardenIdContext";
import {GardenSizeContext} from "./garden_connected_context/GardenSizeContext";
import axios from "axios";
import {environmentVariables} from "../../../EnvironmentVariables";

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
            console.log(error.response.data)
        })
    }, [setGardenSize, actualGardenId])

    const saveSizeChangesToDatabase = (rows, columns) => {
        const data = {
            garden_id: actualGardenId,
            row_count: rows,
            column_count: columns,
        }
        // Parameters: url, data, callbackSuccess, callbackError
        putRequest('/api/update-garden-size', data, () => {}, () => {})
    }

    const modifyRows = () => {
        setGardenSize(prevData => ({
            ...prevData,
            rows: gardenSize.rows + 1,
        }))
        saveSizeChangesToDatabase(gardenSize.rows + 1, gardenSize.columns)
    }

    const modifyColumns = () => {
        setGardenSize(prevData => ({
            ...prevData,
            columns: gardenSize.columns + 1,
        }))
        saveSizeChangesToDatabase(gardenSize.rows, gardenSize.columns + 1)
    }

    const addNewGarden = () => {
        // Axios to create new garden to DB
        axios({
            method: "post",
            url: `${environmentVariables.BACKEND_URL}/api/add-new-garden`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
        }).then((res) => {
            console.log(res.data);
            setActualGardenId(res.data.id)
        }).catch((error) => {
            console.log(error.response.data)
        })
    }

    return (
        <div className="garden-option-container">

            <DownloadGarden gardenRef={gardenRef} rows={gardenSize.rows} columns={gardenSize.columns}/>

            <button className="option" onClick={() => modifyRows()}>
                <BsFillPlusCircleFill/>
                <span>Add row</span>
            </button>

            <button className="option" onClick={() => modifyColumns()}>
                <BsFillPlusCircleFill/>
                <span>Add column</span>
            </button>

            <button className="option" onClick={() => addNewGarden()}>
                <BsFillPlusCircleFill/>
                <span>New garden</span>
            </button>

        </div>
    );
}

export default GardenOptionContainer;
