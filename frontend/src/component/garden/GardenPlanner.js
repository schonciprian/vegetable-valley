import React, {useEffect, useState} from 'react';
import '../../stylesheet/garden/GardenPlanner.css'

import aubergine from "../../image/vegetables/eggplant.png";
import beans from "../../image/vegetables/beans.png";
import beetroot from "../../image/vegetables/beetroot.png";
import brussels_sprouts from "../../image/vegetables/brussels_sprouts.png";
import cabbage from "../../image/vegetables/cabbage.png";
import purple_cabbage from "../../image/vegetables/purple_cabbage.png";
import carrot from "../../image/vegetables/carrot.png";
import celeriac from "../../image/vegetables/celeriac.png";
import dirt from "../../image/garden/dirt.jpeg";


function GardenPlanner() {

    const [garden, setGarden] = useState([]);

    const [vegetables, setVegetables] = useState([
        {id: 0, name: 'Aubergine', pictureURL: aubergine},
        {id: 1, name: 'Beans', pictureURL: beans},
        {id: 2, name: 'Beetroot', pictureURL: beetroot},
        {id: 3, name: 'Brussels sprouts', pictureURL: brussels_sprouts},
        {id: 4, name: 'Cabbage', pictureURL: cabbage},
        {id: 5, name: 'Purple cabbage', pictureURL: purple_cabbage},
        {id: 6, name: 'Carrot', pictureURL: carrot},
        {id: 7, name: 'Celeriac', pictureURL: celeriac},
    ]);

    useEffect(() => {
        let garden = [];
        const cellNumber = 30
        for (let i = 0; i < cellNumber; i++) {
            garden.push({id: i, name: '', pictureURL: dirt})
        }
        setGarden(garden)
    })


    return (
        <div className="garden-planner">
            <div className="garden-container">
                <h1>Your garden</h1>
                <div className="garden">
                    {garden.map(cell =>
                        <div key={cell.id} className="cell">
                            <img src={cell.pictureURL} alt=""/>
                        </div>
                    )}
                </div>
            </div>

            <div className="vegetable-list-container">
                <h1>Available vegetables</h1>
                <div className="vegetable-list">
                    {vegetables.map(vegetable =>
                        <div key={vegetable.id} id={vegetable.id} className="vegetable-container">
                            <div className="vegetable-name">{vegetable.name}</div>
                            <img src={vegetable.pictureURL} alt=""/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GardenPlanner;