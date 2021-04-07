import React, {useEffect, useState} from 'react';
import '../../stylesheet/garden/GardenPlanner.css'
import dirt from "../../image/garden/dirt.jpeg";
import {Vegetables} from "../grow_guides/Descriptions";
import axios from "axios";
import {environmentVariables} from "../../EnvironmentVariables";

function GardenPlanner() {
    const [garden, setGarden] = useState([]);
    const [vegetables, setVegetables] = useState([]);
    const [draggedVegetable, setDraggedVegetable] = useState({})
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        let source = axios.CancelToken.source();

        ///////////////////////////////////////////////
        // Fill garden state with data from database //
        ///////////////////////////////////////////////
        axios({
            method: "get",
            url: `${environmentVariables.BACKEND_URL}/api/garden`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
        }, {cancelToken: source.token}).then((res) => {
            let garden = [];
            const rows = 5;
            const columns = 6;

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    let vegetable = res.data[0].find(cell => cell.cell_row === i && cell.cell_column === j)
                        ?? {
                            cell_row: i,
                            cell_column: j,
                            cell_name: '',
                            cell_picture_url: dirt
                        };
                    garden.push({
                        id: `${vegetable.cell_row}-${vegetable.cell_column}`,
                        name: vegetable.cell_name,
                        pictureURL: vegetable.cell_picture_url,
                    })
                }
            }
            setGarden(garden)

        }).catch((error) => {
            console.log(error.response.data)
        })

        ///////////////////////////////////////
        // Create available vegetables state //
        ///////////////////////////////////////
        let vegetables = [];
        Object.keys(Vegetables).forEach((vegetable) => {
            vegetables.push({
                id: Vegetables[vegetable].id,
                name: Vegetables[vegetable].name,
                pictureURL: Vegetables[vegetable].pictureURL,
            })
        })
        setVegetables(vegetables)
        setRefresh(false)

        //////////////////////////////////
        // On unmount cancel axios call //
        //////////////////////////////////
        return () => {
            source.cancel();
        }
    }, [refresh])

    const onDrag = (event, vegetable) => {
        event.preventDefault();
        setDraggedVegetable(vegetable)
    }

    const onDragOver = (event) => {
        event.preventDefault();
    }

    const onDrop = (event) => {
        const destination = event.target.parentElement.dataset.id ?? null;

        if (destination !== null) {
            axios({
                method: "post",
                url: `${environmentVariables.BACKEND_URL}/api/garden`,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json, text/plain, */*",
                    Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
                },
                data: {
                    cell_row: destination.split("-")[0],
                    cell_column: destination.split("-")[1],
                    cell_name: draggedVegetable.name,
                    cell_picture_url: draggedVegetable.pictureURL,
                }
            }).then((res) => {
                // console.log(res.data);
            }).catch((error) => {
                console.log(error.response.data)
            })
        }
        changeCellToVegetable(destination);
        setDraggedVegetable({});
    }

    const changeCellToVegetable = (destination) => {
        const cell = garden.find(cell => cell.id === destination)
        cell.name = draggedVegetable.name;
        cell.pictureURL = draggedVegetable.pictureURL;
    }

    const removeVegetableFromCell = (cellId) => {
        axios({
            method: "delete",
            url: `${environmentVariables.BACKEND_URL}/api/garden`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
            data: {
                cell_row: cellId.split("-")[0],
                cell_column: cellId.split("-")[1],
            }
        }).then((res) => {
            setRefresh(true);

        }).catch((error) => {
            console.log(error.response.data)
        })
    }

    return (
        <div className="garden-planner">
            <div className="garden-container">
                <h1>Your garden</h1>
                <div className="garden"
                     onDrop={(event) => onDrop(event)}
                     onDragOver={(event => onDragOver(event))}>
                    {garden.map(cell =>
                        <div key={cell.id} className="cell" data-id={cell.id}>
                            {cell.name.length !== 0 ?
                                <div className="remove" onClick={() => removeVegetableFromCell(cell.id)}>X</div> : ""}
                            <img draggable={false} src={cell.pictureURL} alt=""/>
                        </div>
                    )}
                </div>
            </div>

            <div className="vegetable-list-container">
                <h1>Available vegetables</h1>
                <div className="vegetable-list">
                    {vegetables.map(vegetable =>
                        <div key={vegetable.name}
                             id={vegetable.id}
                             className="vegetable-container draggable"
                             draggable
                             onDrag={(event) => onDrag(event, vegetable)}>
                            <div className="vegetable-name">{vegetable.name}</div>
                            <img draggable={false} src={vegetable.pictureURL} alt=""/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GardenPlanner;