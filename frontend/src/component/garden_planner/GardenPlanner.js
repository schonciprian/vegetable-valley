import React, { useRef, useState} from 'react';
import '../../stylesheet/garden/GardenPlanner.css'
import OptionVegetableList from "./block_connected/OptionVegetableList";
import OptionBlockList from "./block_connected/OptionBlockList";

import Garden from "./garden_connected/Garden";
import GardenSelection from "./garden_connected/GardenSelection";
import GardenOptionContainer from "./garden_connected/GardenOptionContainer";

function GardenPlanner() {
    // Refs
    const gardenRef = useRef(null);
    // States
    const [draggedVegetable, setDraggedVegetable] = useState({})
    const [selectedOptionList, setSelectedOptionList] = useState("Vegetables")

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
                <GardenSelection/>

                <GardenOptionContainer gardenRef={gardenRef}/>

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
