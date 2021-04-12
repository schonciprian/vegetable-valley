import React, {useContext, useRef, useState} from 'react';
import '../../stylesheet/garden/GardenPlanner.css'
import {BsFillPlusCircleFill} from "react-icons/bs";
import {GardenSizeContext} from "./GardenSizeContext";
import OptionVegetableList from "./OptionVegetableList";
import Garden from "./Garden";
import DownloadGarden from "./DownloadGarden";

function GardenPlanner() {
    const [draggedVegetable, setDraggedVegetable] = useState({})
    const [gardenSize, setGardenSize] = useContext(GardenSizeContext);
    const [rows, setRows] = useState(gardenSize.rows);
    const [columns, setColumns] = useState(gardenSize.columns);
    const gardenRef = useRef(null);

    return (
        <div className="garden-planner">
            <div className="garden-container">
                <h1>Your garden</h1>
                <div className="option-selection">

                    <DownloadGarden gardenRef={gardenRef}
                                    rows={rows}
                                    columns={columns}/>

                    <button className="option" onClick={() => {
                        setGardenSize(prevData => ({
                            ...prevData,
                            rows: rows + 1,
                        }))
                        setRows(rows + 1)
                    }}>
                        <BsFillPlusCircleFill/>Add row
                    </button>

                    <button className="option" onClick={() => {
                        setGardenSize(prevData => ({
                            ...prevData,
                            columns: columns + 1,
                        }))
                        setColumns(columns + 1)
                    }}>
                        <BsFillPlusCircleFill/>Add column
                    </button>

                </div>

                <Garden gardenRef={gardenRef}
                        draggedVegetable={draggedVegetable}
                        setDraggedVegetable={setDraggedVegetable}
                        rows={rows}
                        columns={columns}/>
            </div>

            <div className="options-container">
                <h1>Available vegetables</h1>
                <div className="option-selection" style={{visibility: "hidden"}}>
                    <button className="option">
                        Download screenshot
                    </button>
                </div>

                <OptionVegetableList setDraggedVegetable={setDraggedVegetable}/>
            </div>
        </div>
    );
}

export default GardenPlanner;