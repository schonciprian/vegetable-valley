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
        <div className="weather-infos">
            <div>City: {weather.name}</div>
            <div>Temperature: {(temp-273.15).toFixed(1)} °C</div>
            <div>Min temp: {(temp_min-273.15).toFixed(1)} °C</div>
            <div>Max temp: {(temp_max-273.15).toFixed(1)} °C</div>
            <div>Feels: {(feels_like-273.15).toFixed(1)} °C</div>
            <div>Pressure: {(pressure-273.15).toFixed(1)} °C</div>
            <div>Wind speed: {weather.wind.speed} m/s</div>
            {/*<div>Clouds: {weather.clouds}%</div>*/}
            <div onClick={() => setCity("Budapest")}>Change city to Budapest</div>
            <div onClick={() => setCity("Gyor")}>Change city to Győr</div>
            <div onClick={() => setCity("Papa")}>Change city to Pápa</div>
            <div onClick={() => setCity("Mosonmagyarovar")}>Change city to Mosonmagyaróvár</div>
            <div onClick={() => setCity("Budapest XVIII. keruelet")}>Change city to XVIII kerület</div>
        </div>
    );
}