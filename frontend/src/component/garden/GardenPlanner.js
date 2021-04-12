import React, {useContext, useRef, useState} from 'react';
import '../../stylesheet/garden/GardenPlanner.css'
import html2canvas from "html2canvas";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {FaCloudDownloadAlt} from "react-icons/fa";
import {GardenSizeContext} from "./GardenSizeContext";
import OptionVegetableList from "./OptionVegetableList";
import Garden from "./Garden";

function GardenPlanner() {
    const [draggedVegetable, setDraggedVegetable] = useState({})
    const [gardenSize, setGardenSize] = useContext(GardenSizeContext);
    const [rows, setRows] = useState(gardenSize.rows);
    const [columns, setColumns] = useState(gardenSize.columns);
    const gardenRef = useRef(null);

    const download = () => {
        const imageWidth = columns <= 6 ? columns * 95 : columns * 86;
        const imageHeight = rows * 86

        const removeButtons = document.querySelectorAll(".remove")
        removeButtons.forEach((button) => button.style.visibility = "hidden")
        gardenRef.current.style.overflow = "visible"
        window.scrollTo(0, 0)
        html2canvas(document.querySelector("#garden"), {
            width: imageWidth,
            height: imageHeight,
            backgroundColor: "#0F1329"
        }).then(canvas => {
            let url = canvas.toDataURL("img/png");
            let a = document.createElement("a");
            a.href = url;
            a.download = "screenshot.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        })
        removeButtons.forEach((button) => button.style.visibility = "visible")
        gardenRef.current.style.overflow = "auto"
    };

    return (
        <div className="garden-planner">
            <div className="garden-container">
                <h1>Your garden</h1>
                <div className="option-selection">
                    <button className="option" onClick={() => download()}>
                        <FaCloudDownloadAlt/>Download screenshot
                    </button>
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

                <Garden
                        gardenRef={gardenRef}
                        draggedVegetable={draggedVegetable}
                        setDraggedVegetable={setDraggedVegetable}
                        rows={rows}
                        columns={columns}/>
            </div>

            <div className="options-container">
                <h1>Available vegetables</h1>
                <div className="option-selection" style={{visibility: "hidden"}}>
                    <button className="option" onClick={() => download()}>
                        <FaCloudDownloadAlt/>Download screenshot
                    </button>
                </div>

                <OptionVegetableList setDraggedVegetable={setDraggedVegetable}/>
            </div>
        </div>
    );
}

export default GardenPlanner;