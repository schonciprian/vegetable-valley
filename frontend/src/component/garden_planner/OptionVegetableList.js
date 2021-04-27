import React, {useEffect, useState} from 'react';
import {Vegetables} from "../grow_guides/Descriptions";

function OptionVegetableList(props) {
    const [vegetables, setVegetables] = useState([]);

    useEffect(() => {
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
    }, [])

    const onDrag = (event, vegetable) => {
        event.preventDefault();
        props.setDraggedVegetable(vegetable)
    }

    return (
        <div className="vegetable-list">
            {vegetables.map(vegetable =>
                <div key={vegetable.name}
                     id={vegetable.id}
                     className="vegetable-container draggable"
                     draggable
                     onDrag={(event) => onDrag(event, vegetable)}
                    >
                    <div className="vegetable-name">{vegetable.name}</div>
                    <img draggable={false} src={vegetable.pictureURL} alt=""/>
                </div>
            )}
        </div>
    );
}

export default OptionVegetableList;