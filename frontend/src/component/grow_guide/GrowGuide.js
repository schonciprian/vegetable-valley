import React from 'react';
import garlic from'../../image/garlic.png';
import onion from'../../image/onion.png';
import red_onion from'../../image/red_onion.png';


export default function GrowGuide() {
    return (
        <div className="grow-guides-container">
            <div className="grow-guide-card">
                <img src={garlic} alt=""/>
                <div className="vegetable-name">Garlic</div>
            </div>
            <div className="grow-guide-card">
                <img src={onion} alt=""/>
                <div className="vegetable-name">Onion</div>
            </div>
            <div className="grow-guide-card">
                <img src={red_onion} alt=""/>
                <div className="vegetable-name">Red onion</div>
            </div>
        </div>
    );
}

