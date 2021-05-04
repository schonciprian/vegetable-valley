import React, {useContext} from 'react';
import {deleteRequest} from "../../additionals/Requests";
import {requestFeedbackError} from "../../additionals/SweetAlert";
import {ActualGardenIdContext} from "./garden_connected_context/ActualGardenIdContext";
import {useHistory} from "react-router-dom";

function Cell(props) {
    const cell =props.cell;
    const [actualGardenId] = useContext(ActualGardenIdContext);
    const refreshGarden = props.refreshGarden;
    const history = useHistory()


    const removeVegetableFromCell = (cellId) => {
        const data = {
            garden_id: actualGardenId,
            cell_row: cellId.split("-")[0],
            cell_column: cellId.split("-")[1],
        }
        deleteRequest('/api/garden', data,
            () => refreshGarden(),
            (error) => requestFeedbackError(error.response, false, history))
    }

    return (
        <div className="cell" data-id={cell.id}>
            {cell.name.length !== 0
                ? <div className="remove" onClick={() => removeVegetableFromCell(cell.id)}>X</div>
                : ""}
            <img draggable={false} src={cell.pictureURL} alt=""/>
        </div>
    );
}

export default Cell;
