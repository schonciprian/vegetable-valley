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

function GardenPlanner() {
    const gardenRef = useRef(null);
    const gardenTitleRef = useRef();

    const [draggedVegetable, setDraggedVegetable] = useState({})
    const [gardenSize, setGardenSize] = useContext(GardenSizeContext);
    const [selectedOptionList, setSelectedOptionList] = useState("Vegetables")

    useEffect(() => {
        if (!window.sessionStorage.getItem("token")) return

        axios({
            method: "get",
            url: `${environmentVariables.BACKEND_URL}/api/get-garden-size`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
        }).then((res) => {
            setGardenSize(prevData => ({
                ...prevData,
                rows: parseInt(res.data[0].row_count),
                columns: parseInt(res.data[0].column_count),
            }))
        }).catch((error) => {
            console.log(error.response.data)
        })
    }, [setGardenSize])

    const saveSizeChangesToDatabase = (rows, columns) => {
        axios({
            method: "put",
            url: `${environmentVariables.BACKEND_URL}/api/update-garden-size`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
            data: {
                row_count: rows,
                column_count: columns,
            },
        }).then((res) => {
            // console.log(res.data);
        }).catch((error) => {
            console.log(error.response.data)
        })
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

    return (
        <div className="garden-planner">
            <div className="garden-container">
                <GardenSelection gardenTitleRef={gardenTitleRef}/>

                <div className="option-selection">

                    <DownloadGarden gardenRef={gardenRef} rows={gardenSize.rows} columns={gardenSize.columns}/>

                    <button className="option" onClick={() => modifyRows()}>
                        <BsFillPlusCircleFill/>Add row
                    </button>

                    <button className="option" onClick={() => modifyColumns()}>
                        <BsFillPlusCircleFill/>Add column
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
