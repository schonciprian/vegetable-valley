import React from 'react';

export default function CitySwitcherComponent(props) {
    return (
        <div className="available-cities">
            <div className="city-name" onClick={() => props.setCity("Budapest")}>Budapest</div>
            <div className="city-name" onClick={() => props.setCity("Győr")}>Győr</div>
            <div className="city-name" onClick={() => props.setCity("Pápa")}>Pápa</div>
            <div className="city-name" onClick={() => props.setCity("Mosonmagyaróvár")}>Mosonmagyaróvár</div>
            <div className="city-name" onClick={() => props.setCity("Budapest XVIII. kerület")}>XVIII kerület</div>
            <div className="city-name" onClick={() => props.setCity("London")}>London</div>
            <div className="city-name" onClick={() => props.setCity("Chicago")}>Chicago</div>
            <div className="city-name" onClick={() => props.setCity("Moscow")}>Moscow</div>
        </div>
    );
}

