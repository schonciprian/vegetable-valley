import React from 'react';
import {Vegetables} from './Descriptions';

export default function GrowGuide() {
    console.log(Vegetables);

    return (
        <div className="grow-guides-container">
            {Object.keys(Vegetables).map((veggie, index) => (
                <div className="grow-guide-card" key={index}>
                    <img src={Vegetables[veggie].pictureURL} alt=""/>
                    <div className="vegetable-name">{Vegetables[veggie].name}</div>
                </div>
            ))}
        </div>
    );
}

