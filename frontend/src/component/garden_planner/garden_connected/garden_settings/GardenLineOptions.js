import React, {useContext} from 'react';
import {GoDiffAdded} from "react-icons/go";
import {AiFillDelete} from "react-icons/ai";
import {putRequest} from "../../../additionals/Requests";
import {requestFeedbackError} from "../../../additionals/SweetAlert";
import {GardenSizeContext} from "../garden_connected_context/GardenSizeContext";
import {ActualGardenIdContext} from "../garden_connected_context/ActualGardenIdContext";
import {useHistory} from "react-router-dom";

///////////////////
// Column option //
export function GardenLineOptionsColumn(props) {
    const index = props.index;
    const refreshGarden = props.refreshGarden;
    const [gardenSize, setGardenSize] = useContext(GardenSizeContext);
    const [actualGardenId] = useContext(ActualGardenIdContext)
    const history = useHistory()

    const removeColumnFromGarden = (index) => {
        const data = {
            garden_id: actualGardenId,
            column_index: index,
        }

        putRequest('/api/remove-column', data,
            () => {
                setGardenSize(prevData => ({
                    ...prevData,
                    rows: gardenSize.rows,
                    columns: gardenSize.columns - 1,
                }))
                refreshGarden()
            },
            (error) => requestFeedbackError(error.response, false, history))
    }

    return (
        <div className="options options-column" data-column={index}>
            <GoDiffAdded onClick={() => console.log("adds")}/>
            <AiFillDelete onClick={() => removeColumnFromGarden(index)}/>
        </div>
    );
}

////////////////
// Row option //
export function GardenLineOptionsRow(props) {
    const index = props.index;
    const refreshGarden = props.refreshGarden;
    const [gardenSize, setGardenSize] = useContext(GardenSizeContext);
    const [actualGardenId] = useContext(ActualGardenIdContext)
    const history = useHistory()

    const removeRowFromGarden = (index) => {
        const data = {
            garden_id: actualGardenId,
            row_index: index,
        }

        putRequest('/api/remove-row', data,
            () => {
                setGardenSize(prevData => ({
                    ...prevData,
                    rows: gardenSize.rows - 1,
                    columns: gardenSize.columns,
                }))
                refreshGarden()
            },
            (error) => {
                requestFeedbackError(error.response, false, history)
            })
    }

    return (
        <div className="options options-row" data-row={index}>
            <GoDiffAdded onClick={() => console.log("add")}/>
            <AiFillDelete onClick={() => removeRowFromGarden(index)}/>
        </div>
    );
}
