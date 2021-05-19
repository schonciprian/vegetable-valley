import React, {useContext, useRef, useState} from 'react';
import axios from "axios";
import {isSafari} from "react-device-detect";
import {foreignCities, hungarianCities, hideCitySelection} from "./CitySelectorHelperVariables";
import {Search} from "react-feather";
import {FaSpinner} from "react-icons/fa";

import '../../stylesheet/error/Error.css';
import {WeatherForecastDataContext} from "../../context/WeatherForecastDataContext";
import {sweetalertErrorPopup} from "../additionals/SweetAlert";

export default function CitySelectorComponent(props) {
    const [, setWeatherForecastData] = useContext(WeatherForecastDataContext);
    const cityInputRef = useRef(null)

    const [loading, setLoading] = useState(false);

    const getCoordinates = (position) => {
        const longitudeCorrection = 0.05;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?` +
            `lat=${(position.coords.latitude)}` +
            `&lon=${(position.coords.longitude - longitudeCorrection)}` +
            `&appid=f913779188ecd17807fa0473780a29fb`)
            .then(response => {
                setWeatherCity(response.data.name)
                setLoading(false);
            })
    }

    const getLocation = () => {
        if (isSafari) {
            sweetalertErrorPopup("This option is not available on your device",
                "Try with Chrome for the best user experience", "info", 5000)
            return;
        }
        if (!navigator.geolocation) {
            sweetalertErrorPopup("Your location is not available", "", "info", 5000)
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(getCoordinates, () => {
            sweetalertErrorPopup("Your location is not available", "", "info", 3000)
            setLoading(false);
        })
    }

    const handleNewCity = async () => {
        try {
            const response = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityInputRef.current.value}&appid=f913779188ecd17807fa0473780a29fb`);
            if (response.status === 200) {
                setWeatherCity(cityInputRef.current.value)
            }
        } catch (error) {
            cityInputRef.current.classList.add("input-error");
            setTimeout(() => cityInputRef.current.classList.remove("input-error"), 1000);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handleNewCity()
    }

    const createListItemOfCities = (listOfCities) => {
        return listOfCities.map((city, index) => (
            <li key={index} onClick={() => {
                setWeatherCity(city)
            }}>
                {city}
            </li>))
    }

    const setWeatherCity = (city) => {
        setWeatherForecastData(prevData => ({
            ...prevData,
            city: city
        }))
        window.sessionStorage.setItem("city", city);
        hideCitySelection();
    }

    return (
        <React.Fragment>
            <div id="city-selector-container"
                 className="city-selector-container"
                 style={{display: "none"}}
                 onClick={hideCitySelection}/>

            <div id="city-selector" className="city-selector" style={{display: "none"}}>
                <div className="city-input-container">
                    <div className="city-input-text">Which city are you curious about?</div>
                    <div className="search-box">
                        <input id="city-input"
                               className="city-input"
                               ref={cityInputRef}
                               onKeyDown={handleKeyDown}/>
                        <div className="search-icon" onClick={handleNewCity}>
                            <Search/>
                        </div>
                    </div>
                </div>
                <div className="city-list-container">
                    <div className="city-list-container-left">
                        <div className="get-location" onClick={getLocation}>Click here to get your location</div>
                        {loading ? <FaSpinner className="loading-spinner"/> : <React.Fragment/>}
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

