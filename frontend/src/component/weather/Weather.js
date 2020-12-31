import React, {useEffect, useState} from "react";
import axios from "axios";
import CitySwitcherComponent from "./CitySwitcherComponent";
import TodayWeatherComponent from "./TodayWeatherComponent";
import WeatherForecastComponent from "./WeatherForecastComponent";


export default function Weather() {
    const [weather, setWeather] = useState([]);
    const [city, setCity] = useState("Gyor");
    const [coordinate, setCoordinate] = useState({});

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f913779188ecd17807fa0473780a29fb`)
                .then(response => {
                    setCoordinate(response.data.coord)
                    setWeather(response.data);
                })
        }, [city]);

    if (weather.length === 0) {
        return <div className="loading">Loading data from server...</div>;
    } else {
        return (
            <div>
                <CitySwitcherComponent setCity={setCity}/>

                <div className="weather-container">
                    <TodayWeatherComponent weather={weather}/>
                    <WeatherForecastComponent coordinate={coordinate}/>
                </div>
            </div>
        );
    }
}