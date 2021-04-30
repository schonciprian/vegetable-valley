import React, {useContext, useEffect, useRef, useState} from 'react';
import '../../stylesheet/garden/GardenPlanner.css'
import {BsFillPlusCircleFill} from "react-icons/bs";
import {GardenSizeContext} from "./garden_connected/garden_settings/GardenSizeContext";
import OptionVegetableList from "./block_connected/OptionVegetableList";
import OptionBlockList from "./block_connected/OptionBlockList";

import Garden from "./garden_connected/Garden";
import DownloadGarden from "./garden_connected/garden_settings/DownloadGarden";
import axios from "axios";
import {environmentVariables} from "../../EnvironmentVariables";
import GardenSelection from "./garden_connected/garden_settings/GardenSelection";
import {ActualGardenIdContext} from "./garden_connected/ActualGardenId";
import {getRequest, putRequest} from "../additionals/Requests";

function GardenPlanner() {
    // Refs
    const gardenRef = useRef(null);
    // States
    const [draggedVegetable, setDraggedVegetable] = useState({})
    const [selectedOptionList, setSelectedOptionList] = useState("Vegetables")
    // Contexts
    const [gardenSize, setGardenSize] = useContext(GardenSizeContext);
    const [actualGardenId, setActualGardenId] = useContext(ActualGardenIdContext)

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

    const renderSelectedOptionListComponent = () => {
        switch (selectedOptionList) {
            case "Blocks":
                return <OptionBlockList setDraggedVegetable={setDraggedVegetable}/>;
            case "Vegetables":
                return <OptionVegetableList setDraggedVegetable={setDraggedVegetable}/>;
            default:
                return <OptionVegetableList setDraggedVegetable={setDraggedVegetable}/>;
        }
    }

    const addNewGarden = () => {
        console.log("add new garden");
    //     Axios to create new garden to DB
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
        <div className="garden-planner">
            <div className="garden-container">
                <GardenSelection/>

                <div className="garden-option-selection">

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

                <Garden gardenRef={gardenRef}
                        draggedVegetable={draggedVegetable}
                        setDraggedVegetable={setDraggedVegetable}/>
            </div>

            <div className="options-container">
                <h1>Available {selectedOptionList.toLowerCase()}</h1>
                <div className="option-selection">
                    <button className={selectedOptionList === "Vegetables" ? "option active-type" : "option"}
                            onClick={() => setSelectedOptionList("Vegetables")}>
                        Vegetables
                    </button>
                    <button className={selectedOptionList === "Blocks" ? "option active-type" : "option"}
                            onClick={() => setSelectedOptionList("Blocks")}>
                        Blocks
                    </button>

                </div>

                {renderSelectedOptionListComponent()}
            </div>
        </div>
    );
}

export default GardenPlanner;
