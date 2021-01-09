import React from 'react';
import {Vegetables} from './Descriptions';

import garlic from '../../image/garlic.png';


export default function GrowGuide() {
    // console.log(Vegetables);


    const toggleCard = (cardIndex) => {
        console.log(cardIndex);

        const card = document.getElementById(`${cardIndex}`);
        console.log(card);
        card.classList.toggle('is-flipped');
    }

    return (
        <div>
        <div className="grow-guides-container">

            {Object.keys(Vegetables).map((veggie, index) => (
                <div key={index} className="card" onClick={() => toggleCard(index)}>
                    <div id={index} className="grow-guide-card card-inner" key={index}>
                        <div className="card-face card-face-front">
                            <img src={Vegetables[veggie].pictureURL} alt=""/>
                            <div className="vegetable-name">{Vegetables[veggie].name}</div>
                        </div>
                        <div className="card-face card-face-back">
                            <div className="card-content">
                                <div className="card-header">
                                    <img className="pp" src={Vegetables[veggie].pictureURL} alt=""/>
                                    <h2>{Vegetables[veggie].name}</h2>
                                </div>
                                <div className="card-body">
                                    <h3>Sowing depth: 3 cm</h3>
                                    <p>some other things</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
        {/*<div className="card" onClick={toggleCard}>*/}
        {/*    <div id="card-inner" className="card-inner">*/}
        {/*        <div className="card-face card-face-front">*/}
        {/*            <h2>Garlic</h2>*/}
        {/*        </div>*/}
        {/*        <div className="card-face card-face-back">*/}
        {/*            <div className="card-content">*/}
        {/*                <div className="card-header">*/}
        {/*                    <img className="pp" src={garlic} alt=""/>*/}
        {/*                    <h2>Garlic</h2>*/}
        {/*                </div>*/}
        {/*                <div className="card-body">*/}
        {/*                    <h3>Sowing depth: 3 cm</h3>*/}
        {/*                    <p>some other things</p>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
        </div>
    );
}

