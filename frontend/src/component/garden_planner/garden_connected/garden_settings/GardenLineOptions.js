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

    const addColumnToGarden = (index) => {
        const data = {
            garden_id: actualGardenId,
            column_index: index,
        }

        putRequest('/api/add-column', data,
            () => {
                setGardenSize(prevData => ({
                    ...prevData,
                    rows: gardenSize.rows,
                    columns: gardenSize.columns + 1,
                }))
                refreshGarden()
            },
            (error) => requestFeedbackError(error.response, false, history))
    }

    return (
        <div className="options options-column" data-column={index}>
            <GoDiffAdded onClick={() => addColumnToGarden(index)}/>
            <AiFillDelete onClick={() => removeColumnFromGarden(index)}/>
        </div>
    );
}

                ////////////////
                // Row option //
                ////////////////
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

    const addRowToGarden = (index) => {
        const data = {
            garden_id: actualGardenId,
            row_index: index,
        }

        putRequest('/api/add-row', data,
            () => {
                setGardenSize(prevData => ({
                    ...prevData,
                    rows: gardenSize.rows + 1,
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
            <GoDiffAdded onClick={() => addRowToGarden(index)}/>
            <AiFillDelete onClick={() => removeRowFromGarden(index)}/>
        </div>
    );
}
