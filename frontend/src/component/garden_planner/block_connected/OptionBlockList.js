import React, {useEffect, useState} from 'react';
import {Blocks} from "./Blocks";

function OptionBlockList(props) {
    const [blocks, setBlocks] = useState([])

    useEffect(() => {
        ///////////////////////////////////
        // Create available blocks state //
        ///////////////////////////////////
        let blockList = [];
        Blocks.forEach((block) => {
            blockList.push({
                id: block.id,
                name: block.name,
                pictureURL: block.pictureURL,
            })
        })
        setBlocks(blockList)
    }, [])

    const onDrag = (event, vegetable) => {
        event.preventDefault();
        props.setDraggedVegetable(vegetable)
    }

    return (
        <div className="vegetable-list">
            {blocks.map(block =>
                <div key={block.name}
                     id={block.id}
                     className="vegetable-container draggable"
                     draggable
                     onDrag={(event) => onDrag(event, block)}
                >
                    <div className="vegetable-name">{block.name}</div>
                    <img draggable={false} src={block.pictureURL} alt=""/>
                </div>
            )}
        </div>
    );
}

export default OptionBlockList;
