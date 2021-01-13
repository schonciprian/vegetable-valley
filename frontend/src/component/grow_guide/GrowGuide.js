import React from 'react';
import {Vegetables} from './Descriptions';
import { FaEyeDropper } from "react-icons/fa";

export default function GrowGuide() {

    const toggleCard = (cardIndex) => {
        const card = document.getElementById(`${cardIndex}`);
        card.classList.toggle('is-flipped');

        const isFlippedCards = Array.prototype.slice.call(document.querySelectorAll('.is-flipped'));

        isFlippedCards.forEach((isFlippedCard) => {
            if (parseInt(isFlippedCard.id) !== cardIndex && !isFlippedCard.classList.contains('pin')) {
                isFlippedCard.classList.remove('is-flipped');
            }
        })
    }

    return (
        <div className="grow-guides-container">

            {Object.keys(Vegetables).map((veggie, index) => (
                <div key={index} className="grow-guide-card-outer" onClick={() => toggleCard(index)}>
                    <div id={index} className="grow-guide-card-inner" key={index}>
                        <div className="card-face card-face-front">
                            <div className="vegetable-name">{Vegetables[veggie].name}</div>
                            <img src={Vegetables[veggie].pictureURL} alt=""/>
                        </div>
                        <div className="card-face card-face-back">
                            <div className="card-content">
                                <div className="card-header">
                                    <h2>{Vegetables[veggie].name}</h2>
                                    <img className="pp" src={Vegetables[veggie].pictureURL} alt=""/>
                                </div>
                                <div className="card-body">
                                    <p>Sowing depth: {Vegetables[veggie].sow_depth ? Vegetables[veggie].sow_depth : 0}</p>
                                    <p>Spacing between rows: {Vegetables[veggie].spacing_between_rows ? Vegetables[veggie].spacing_between_rows : 0}</p>
                                    <p>Spacing along rows: {Vegetables[veggie].spacing_along_row ? Vegetables[veggie].spacing_along_row : 0}</p>
                                    <div className="buttons" onClick={(event) => event.stopPropagation()}>
                                        <div className="more-info" onClick={(event) => {
                                            event.stopPropagation();
                                            console.log("More info")
                                        }}>More info</div>
                                        <FaEyeDropper className="pin-icon" onClick={(event) => {
                                            event.stopPropagation();
                                            document.getElementById(`${index}`).classList.toggle('pin')
                                        }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}

