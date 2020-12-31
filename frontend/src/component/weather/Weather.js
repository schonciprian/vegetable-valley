import React, {useEffect, useState} from "react";
import axios from "axios";
import {MapPin} from 'react-feather';
import CitySwitcherComponent from "./CitySwitcherComponent";
import TodayWeatherComponent from "./TodayWeatherComponent";
import ForecastWeatherComponent from "./ForecastWeatherComponent";


export default function Weather() {
    const [weather, setWeather] = useState([]);
    const [weatherForecast, setWeatherForecast] = useState([]);
    const [city, setCity] = useState("Gyor");
    const [indexOfDailyForecast, setIndexOfDailyForecast] = useState(0);
    // QUESTION: if I want to set the coordinates in the first API call and the second wants to use it
    // it will use the previous coordinates despite of it knows the correct coordinates.
    // For make working it well, I need to set longitude and latitude separately, but why?
    // const [coordinate, setCoordinate] = useState({"lon":17.64,"lat":47.68});
    let latitude;
    let longitude;

    useEffect(() => axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f6c317d5027246f70ca2f9fcbc4ea46c`)
        .then(response => {
            // setCoordinate(response.data.coord)
            setWeather(response.data);
            latitude = response.data.coord.lat;
            longitude = response.data.coord.lon;
        })
        .then(() => axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly&appid=f6c317d5027246f70ca2f9fcbc4ea46c`))
        .then(response => {
            setWeatherForecast(response.data);
        }), [city]);

    if (weather.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <CitySwitcherComponent setCity={setCity}/>

            <div className="weather-container">
                <TodayWeatherComponent weather={weather}/>

                <ForecastWeatherComponent weatherForecast={weatherForecast}
                                          indexOfDailyForecast={indexOfDailyForecast}
                                          setIndexOfDailyForecast={setIndexOfDailyForecast}/>
            </div>
        </div>
    );
}