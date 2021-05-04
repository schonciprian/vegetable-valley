import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
// Contexts
import {GardenSizeContext} from "../garden_connected_context/GardenSizeContext";
import {ActualGardenIdContext} from "../garden_connected_context/ActualGardenIdContext";
// Icons
import {GoDiffAdded} from "react-icons/go";
import {AiFillDelete} from "react-icons/ai";
// Additional
import {putRequest} from "../../../additionals/Requests";
import {requestFeedbackError} from "../../../additionals/SweetAlert";

                ///////////////////
                // Column option //
                ///////////////////
export function GardenLineOptionsColumn(props) {
    const index = props.index;
    const [gardenSize, setGardenSize] = useContext(GardenSizeContext);
    const [actualGardenId] = useContext(ActualGardenIdContext)
    const history = useHistory()

    const editColumnInGarden = (index, type) => {
        const data = {
            garden_id: actualGardenId,
            column_index: index,
        }
        const url = type === "remove" ? '/api/remove-column' : '/api/add-column';
        const columnsValue = type === "remove" ? gardenSize.columns - 1 : gardenSize.columns + 1;
        putRequest(url, data,
            () => {
                setGardenSize(prevData => ({
                    ...prevData,
                    columns: columnsValue,
                }))
            },
            (error) => requestFeedbackError(error.response, false, history))
    }

    return (
        <div className="options options-column" data-column={index}>
            <GoDiffAdded onClick={() => editColumnInGarden(index, 'add')}/>
            <AiFillDelete onClick={() => editColumnInGarden(index, 'remove')}/>
        </div>
    );
}

                ////////////////
                // Row option //
                ////////////////
export function GardenLineOptionsRow(props) {
    const index = props.index;
    const [gardenSize, setGardenSize] = useContext(GardenSizeContext);
    const [actualGardenId] = useContext(ActualGardenIdContext)
    const history = useHistory()

    const editRowInGarden = (index, type) => {
        const data = {
            garden_id: actualGardenId,
            row_index: index,
        }
        const url = type === "remove" ? '/api/remove-row' : '/api/add-row';
        const rowsValue = type === "remove" ? gardenSize.rows - 1 : gardenSize.rows + 1;

        putRequest(url, data,
            () => {
                setGardenSize(prevData => ({
                    ...prevData,
                    rows: rowsValue,
                }))
            },
            (error) => {
                requestFeedbackError(error.response, false, history)
            })
    }

    return (
        <div className="options options-row" data-row={index}>
            <GoDiffAdded onClick={() => editRowInGarden(index, 'add')}/>
            <AiFillDelete onClick={() => editRowInGarden(index, 'remove')}/>
        </div>
    );
}
