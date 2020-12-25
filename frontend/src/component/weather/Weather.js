import React, {useEffect, useState} from "react";
import axios from "axios";
import { MapPin, Sun } from 'react-feather';


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

    let {temp, feels_like, temp_min, temp_max, pressure} = weather.main;
    temp = (temp-273.15).toFixed(1);
    feels_like = (feels_like-273.15).toFixed(1);
    temp_min = (temp_min-273.15).toFixed(1);
    temp_max = (temp_max-273.15).toFixed(1);

    const windSpeed = ((weather.wind.speed)*3.6).toFixed(1);

    const {main, description} = weather.weather[0];
    const weatherType = main;
    const weatherTypeDescription = description;

    const cityName = weather.name;
    const country = weather.sys.country;



    return (
        <div>
            <div className="weather-infos">
                <div onClick={() => setCity("Budapest")}>Budapest</div>
                <div onClick={() => setCity("Győr")}>Győr</div>
                <div onClick={() => setCity("Pápa")}>Pápa</div>
                <div onClick={() => setCity("Mosonmagyaróvár")}>Mosonmagyaróvár</div>
                <div onClick={() => setCity("Budapest XVIII. kerület")}>XVIII kerület</div>
                <div onClick={() => setCity("London")}>London</div>
                <div onClick={() => setCity("Rome")}>Róma</div>
            </div>

            <div className="container">
                <div className="weather-side">
                    <div className="weather-gradient"/>
                    <div className="date-container">
                        <h2 className="date-dayname">Tuesday*</h2>
                        <span className="date-day">15 Jan 2019*</span>
                        <MapPin className="location-icon"/>
                        <span className="location">{cityName}, {country}</span>
                    </div>
                    <div className="weather-container">
                        <Sun className="weather-icon"/>
                        <h1 className="weather-temp">{temp}</h1>
                        <h3 className="weather-desc">{weatherType}</h3>
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
                            <div className="wind"><span className="title">WIND</span><span className="value">{windSpeed} km/h</span>
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
                        <button className="location-button">
                            <MapPin className="location-icon"/>
                            <span>Change location</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}