import React from 'react';
import axios from "axios";
import {isSafari} from "react-device-detect";

export default function CitySelectorComponent(props) {
    const hungarianCities = ['Budapest', 'Bekescsaba', 'Debrecen', 'Eger', 'Gyor', 'Kaposvar', 'Kecskemet',
        'Miskolc', 'Nyiregyhaza', 'Pecs', 'Salgotarjan', 'Szeged', 'Szekszard', 'Szekesfehervar',
        'Szolnok', 'Szombathely', 'Tatabanya', 'Veszprem', 'Zalaegerszeg'];
    const foreignCities = ['Amsterdam', 'Berlin', 'Bratislava', 'Copenhagen', 'Lisbon', 'London', 'Madrid', 'Paris', 'Rome', 'Wien']

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

    const handleFocus = (event) => event.target.select();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            props.setCity(event.target.value)
            hideCitySelection()
            document.getElementById("city-input").value = "";
        }
    }

    const handleCityOnClick = (hungarianCity) => {
        props.setCity(hungarianCity);
        hideCitySelection();
    }

    const hideCitySelection = () => {
        document.getElementById("city-selector-container").style.display = "none";
        document.getElementById("city-selector").style.display = "none";
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
                    <input id="city-input"
                           className="city-input"
                           onKeyDown={handleKeyDown}
                           onClick={handleFocus}/>
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

