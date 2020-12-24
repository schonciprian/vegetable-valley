import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Weather() {
    const [weather, setWeather] = useState([]);
    const [city, setCity] = useState("Gyor");

    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f6c317d5027246f70ca2f9fcbc4ea46c`)
            .then((response) => setWeather(response.data));
    }, [city]);

    if (weather.length === 0) {
        return <div>Loading...</div>;
    }

    const {temp, feels_like, temp_min, temp_max, pressure} = weather.main;

    return (
        /*<div className="weather-infos">
            <div>City: {weather.name}</div>
            <div>Temperature: {(temp-273.15).toFixed(1)} °C</div>
            <div>Min temp: {(temp_min-273.15).toFixed(1)} °C</div>
            <div>Max temp: {(temp_max-273.15).toFixed(1)} °C</div>
            <div>Feels: {(feels_like-273.15).toFixed(1)} °C</div>
            <div>Pressure: {(pressure-273.15).toFixed(1)} °C</div>
            <div>Wind speed: {weather.wind.speed} m/s</div>
            {/!*<div>Clouds: {weather.clouds}%</div>*!/}
            <div onClick={() => setCity("Budapest")}>Change city to Budapest</div>
            <div onClick={() => setCity("Gyor")}>Change city to Győr</div>
            <div onClick={() => setCity("Papa")}>Change city to Pápa</div>
            <div onClick={() => setCity("Mosonmagyarovar")}>Change city to Mosonmagyaróvár</div>
            <div onClick={() => setCity("Budapest XVIII. keruelet")}>Change city to XVIII kerület</div>
        </div>*/
        <div className="container">
            <div className="weather-side">
                <div className="weather-gradient"/>
                <div className="date-container">
                    <h2 className="date-dayname">Tuesday</h2>
                    <span className="date-day">15 Jan 2019</span>
                    <i className="location-icon" data-feather="map-pin"/>
                    <span className="location">Paris, FR</span>
                </div>
                <div className="weather-container">
                    <i className="weather-icon" data-feather="sun"/>
                    <h1 className="weather-temp">29°C</h1>
                    <h3 className="weather-desc">Sunny</h3>
                </div>
            </div>
            <div className="info-side">
                <div className="today-info-container">
                    <div className="today-info">
                        <div className="precipitation"><span className="title">PRECIPITATION</span><span
                            className="value">0 %</span>
                            <div className="clear"/>
                        </div>
                        <div className="humidity"><span className="title">HUMIDITY</span><span
                            className="value">34 %</span>
                            <div className="clear"/>
                        </div>
                        <div className="wind"><span className="title">WIND</span><span className="value">0 km/h</span>
                            <div className="clear"/>
                        </div>
                    </div>
                </div>
                <div className="week-container">
                    <ul className="week-list">
                        <li className="active">
                            <i className="day-icon" data-feather="sun"/>
                            <span className="day-name">Tue</span>
                            <span className="day-temp">29°C</span>
                        </li>
                        <li>
                            <i className="day-icon" data-feather="cloud"/>
                            <span className="day-name">Wed</span>
                            <span className="day-temp">21°C</span>
                        </li>
                        <li>
                            <i className="day-icon" data-feather="cloud-snow"/>
                            <span className="day-name">Thu</span><span className="day-temp">08°C</span></li>
                        <li>
                            <i className="day-icon" data-feather="cloud-rain"/>
                            <span className="day-name">Fry</span><span className="day-temp">19°C</span></li>
                        <div className="clear"/>
                    </ul>
                </div>
                <div className="location-container">
                    <button className="location-button">Change location
                        {/*<i data-feather="map-pin"/>*/}
                        {/*<span>Change location</span>*/}
                    </button>
                </div>
            </div>
        </div>
    );
}