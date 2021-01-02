import React from 'react';
import axios from "axios";
import {isSafari} from "react-device-detect";
import {foreignCities,
        hungarianCities,
        handleFocus,
        hideCitySelection} from "./CitySelectorHelperVariables";
import {Search} from "react-feather";

export default function CitySelectorComponent(props) {

    const getCoordinates = (position) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${(position.coords.latitude)}&lon=${(position.coords.longitude)}&appid=f913779188ecd17807fa0473780a29fb`)
            .then(response => {
                props.setCity(response.data.name)
            })
    }

    const getLocation = () => {
        hideCitySelection()
        if (!isSafari) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getCoordinates, () => {
                    alert("Your location is not available. ");})
            } else {
                alert("Your location is not available");
            }
        } else {
            alert("This option not available on your device")
        }
    }

    const handleNewCity = () => {
        props.setCity(document.getElementById("city-input").value)
        hideCitySelection()
        document.getElementById("city-input").value = "";
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleNewCity();
        }
    }

    const handleCityOnClick = (hungarianCity) => {
        props.setCity(hungarianCity);
        hideCitySelection();
    }

    const createListItemOfCities = (listOfCities) => {
        return listOfCities.map((value, index) => (
            <li key={index} onClick={() => {handleCityOnClick(value)}}>
                {value}
            </li>))
    }

    return (
        <React.Fragment>
            <div id="city-selector-container"
                 className="city-selector-container"
                 style={{display: "none"}}
                 onClick={() => {
                     hideCitySelection()
                 }}/>

            <div id="city-selector" className="city-selector" style={{display: "none"}}>
                <div className="city-input-container">
                    <div className="city-input-text">Which city are you curious about?</div>
                    <div className="search-box">
                        <input id="city-input"
                               className="city-input"
                               onKeyDown={handleKeyDown}
                               onClick={handleFocus}/>
                        <div className="search-icon" onClick={handleNewCity}>
                            <Search/>
                        </div>
                    </div>
                </div>
                <div className="city-list-container">
                    <div className="city-list-container-left">
                        <div className="get-location" onClick={getLocation}>Click here to get your location</div>

                        <div className="city-list-hungary">
                            <div className="city-list-title">Chief towns of counties</div>
                            <ul>
                                {createListItemOfCities(hungarianCities)}
                            </ul>
                        </div>
                    </div>

                    <div className="city-list-abroad">
                        <div className="city-list-title">Abroad</div>
                        <ul>
                            {createListItemOfCities(foreignCities)}
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

