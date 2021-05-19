import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from "axios";
import {isSafari} from "react-device-detect";
import {foreignCities, hungarianCities, hideCitySelection} from "./CitySelectorHelperVariables";
import {Search} from "react-feather";
import {FaSpinner} from "react-icons/fa";

import '../../stylesheet/error/Error.css';
import {WeatherForecastDataContext} from "../../context/WeatherForecastDataContext";
import {serviceUnavailablePopUp, sweetalertErrorPopup} from "../additionals/SweetAlert";
import {deleteRequest, getRequest, postRequest} from "../additionals/Requests";

export default function CitySelectorComponent(props) {
    const [previousSearchedCities, setPreviousSearchedCities] = useState([]);
    const [weatherForecastData, setWeatherForecastData] = useContext(WeatherForecastDataContext);
    const cityInputRef = useRef(null)

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getRequest('/api/get-searched-city', {},
            (response) => {
            const cities = response.data.map((city_object) => city_object.city_name)
            setPreviousSearchedCities(cities)
            },
            () => {})
    }, [weatherForecastData, previousSearchedCities])

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
        const data = {city_name: cityInputRef.current.value}
        try {
            const response = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityInputRef.current.value}&appid=f913779188ecd17807fa0473780a29fb`);
            if (response.status === 200) {
                setWeatherCity(cityInputRef.current.value)

                // Save available searched city to DB
                postRequest('/api/save-searched-city', data, () => {
                }, () => {
                })
            }

        } catch (error) {
            cityInputRef.current.classList.add("input-error");
            setTimeout(() => cityInputRef.current.classList.remove("input-error"), 1000);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handleNewCity()
    }

    const removeCity = (cityName) => {
        let previousSearchedCitiesCopy = [...previousSearchedCities]
        delete previousSearchedCitiesCopy[cityName]
        setPreviousSearchedCities(previousSearchedCitiesCopy)
    }

    const removeSearchedCity = (city) => {
        deleteRequest('/api/remove-searched-city', {city_name: city},
            () => {removeCity(city)},
            (error) => {
                if (error.response === undefined) {
                    serviceUnavailablePopUp("Service unavailable", "Try again later", 2000)
                    return;
                }
            })
    }

    const createListItemOfCities = (listOfCities, removeButton) => {
        return listOfCities.map((city, index) => (
            <li key={index} onClick={() => {setWeatherCity(city)}}>
                {city}
                {removeButton ? <div className="remove-city" onClick={(event) => {
                    event.stopPropagation()
                    removeSearchedCity(city)
                }}>X</div> : ""}
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
                        {previousSearchedCities.length !== 0
                            ? <div className="city-list-previous">
                                <div className="city-list-title">Previous searches</div>
                                <ul>
                                    {createListItemOfCities(previousSearchedCities, true)}
                                </ul>
                            </div>
                            : ""}
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

