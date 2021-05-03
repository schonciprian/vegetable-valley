import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
// Contexts
import {GardenSizeContext} from "./garden_connected_context/GardenSizeContext";
import {ActualGardenIdContext} from "./garden_connected_context/ActualGardenIdContext";
import {LoadingContext} from "../../../context/LoadingContext";
// Images
import dirt from "../../../image/garden/dirt_2.png";
// Helpers
import {deleteRequest, getRequest, postRequest, putRequest} from "../../additionals/Requests";
import {requestFeedbackError} from "../../additionals/SweetAlert";
import {AiFillDelete} from "react-icons/ai";
import Loading from "./garden_settings/Loading";

function Garden(props) {
    const history = useHistory()
    // Refs
    const gardenRef = props.gardenRef;
    // States
    const [garden, setGarden] = useState([]);
    // Contexts
    const [loading, setLoading] = useContext(LoadingContext)
    const [gardenSize, setGardenSize] = useContext(GardenSizeContext);
    const [actualGardenId] = useContext(ActualGardenIdContext)
    // props
    const draggedVegetable = props.draggedVegetable;
    const setDraggedVegetable = props.setDraggedVegetable;

    // Callbacks
    const fillGardenCells = useCallback((response) => {
        let garden = [];
        for (let i = 0; i < gardenSize.rows; i++) {
            let row = [];
            for (let j = 0; j < gardenSize.columns; j++) {
                let vegetable = response.data[0].find(cell => cell.cell_row === i && cell.cell_column === j)
                    ?? {
                        cell_row: i,
                        cell_column: j,
                        cell_name: '',
                        cell_picture_url: dirt
                    };
                row.push({
                    id: `${vegetable.cell_row}-${vegetable.cell_column}`,
                    name: vegetable.cell_name,
                    pictureURL: vegetable.cell_picture_url,
                })
            }
            garden.push(row)
        }
        setGarden(garden)
    }, [setGarden, gardenSize])

    const refreshGarden = useCallback((response) => {
        const params = {garden_id: actualGardenId};
        getRequest('/api/garden', params,
            (response) => {
                fillGardenCells(response);
                setLoading(false);
            },
            (error) => requestFeedbackError(error.response, true, history))
    }, [actualGardenId, fillGardenCells, setLoading, history])

    useEffect(() => {
        setLoading(true)
        if (actualGardenId === null) return
        refreshGarden()
    }, [actualGardenId, setLoading, refreshGarden])

    const saveVegetableToCell = (event) => {
        const destination = event.target.parentElement.dataset.id ?? null;

        if (destination !== null) {
            const data = {
                garden_id: actualGardenId,
                cell_row: destination.split("-")[0],
                cell_column: destination.split("-")[1],
                cell_name: draggedVegetable.name,
                cell_picture_url: draggedVegetable.pictureURL,
            }
            postRequest('/api/garden', data,
                () => {
                    changeCellToVegetable(destination);
                    setDraggedVegetable({});
                }, (error) => requestFeedbackError(error.response, false, history))
        }
    }

    const changeCellToVegetable = (destination) => {
        const destinationCell = garden.flat().find(cell => cell.id === destination)
        destinationCell.name = draggedVegetable.name;
        destinationCell.pictureURL = draggedVegetable.pictureURL;
    }

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

    if (loading) return <Loading/>

    return (
        <div id="garden" className="garden" ref={gardenRef}
             onDrop={(event) => saveVegetableToCell(event)}
             onDragOver={(event => event.preventDefault())}>
            <div className="row remove-bar">
                <div className="remove-empty-space"/>
                {garden.map((row, rowindex) =>
                    row.map((cell, index) => rowindex < 1
                        ? <div key={index} className="remove-column" data-column={index} onClick={() => removeColumnFromGarden(index)}><AiFillDelete/></div>
                        : <React.Fragment key={index}/>)
                )}
            </div>
            {garden.map((row, index) =>
                <div className="row" key={index}>
                    <div className="remove-row" data-row={index} onClick={() => removeRowFromGarden(index)}><AiFillDelete/></div>
                    {row.map(cell =>
                        <div key={cell.id} className="cell" data-id={cell.id}>
                            {cell.name.length !== 0
                                ? <div className="remove" onClick={() => removeVegetableFromCell(cell.id)}>X</div>
                                : ""}
                            <img draggable={false} src={cell.pictureURL} alt=""/>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Garden;
