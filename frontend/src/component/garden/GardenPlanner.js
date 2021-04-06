import React, {useEffect, useState} from 'react';
import '../../stylesheet/garden/GardenPlanner.css'
import dirt from "../../image/garden/dirt.jpeg";
import {Vegetables} from "../grow_guides/Descriptions";


function GardenPlanner() {

    const [garden, setGarden] = useState([]);

    const [vegetables, setVegetables] = useState([]);
    const [draggedVegetable, setDraggedVegetable] = useState({})

    useEffect(() => {
        // Create garden state
        let garden = [];
        const cellNumber = 30
        for (let i = 0; i < cellNumber; i++) {
            garden.push({id: i, name: '', pictureURL: dirt})
        }
        setGarden(garden)

        // Create available vegetables state
        let vegetables = [];
        Object.keys(Vegetables).forEach((vegetable)=>{
            vegetables.push({
                id: Vegetables[vegetable].id,
                name: Vegetables[vegetable].name,
                pictureURL: Vegetables[vegetable].pictureURL,
            })
        })
        setVegetables(vegetables)
    }, [])

    const onDrag = (event, vegetable) => {
        event.preventDefault();
        setDraggedVegetable(vegetable)
    }

    const onDragOver = (event) => {
        event.preventDefault();
    }

    const onDrop = (event) => {
        setDraggedVegetable({})
        const destinationId = parseInt(event.target.parentElement.dataset.id)
        garden.forEach(cell => {
            // Cell id equals the destination id
            if (cell.id === destinationId) {
                cell.name = draggedVegetable.name;
                cell.pictureURL = draggedVegetable.pictureURL;
            }
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