import React from 'react';
import {Vegetables} from './Descriptions';

export default function GrowGuide() {

    const toggleCard = (cardIndex) => {
        const isFlippedCard = document.querySelector('.is-flipped');
        if (isFlippedCard) {
            isFlippedCard.classList.remove('is-flipped');
        }

        const card = document.getElementById(`${cardIndex}`);
        card.classList.toggle('is-flipped');
    }

    return (
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
                                    <p>Sowing depth: {Vegetables[veggie].sow_depth ? Vegetables[veggie].sow_depth : 0}</p>
                                    <p>Spacing between rows: {Vegetables[veggie].spacing_between_rows ? Vegetables[veggie].spacing_between_rows : 0}</p>
                                    <p>Spacing along rows: {Vegetables[veggie].spacing_along_row ? Vegetables[veggie].spacing_along_row : 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}

