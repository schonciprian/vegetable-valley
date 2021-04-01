import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import TodayWeatherComponent from "./TodayWeatherComponent";
import WeatherForecastComponent from "./WeatherForecastComponent";
import CitySelectorComponent from "../CitySelectorComponent";
import '../../../stylesheet/weather/Today_Weather.css';
import '../../../stylesheet/weather/Forecast_Weather.css';
import '../../../stylesheet/weather/City_Selector.css';
import '../../../stylesheet/weather/Weather_forecast.css';
import {WeatherForecastDataContext} from "../../../context/WeatherForecastDataContext";

export default function Weather() {
    const [weather, setWeather] = useState([]);
    const [weatherForecastData] = useContext(WeatherForecastDataContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${weatherForecastData.city}&appid=f913779188ecd17807fa0473780a29fb`);
                setWeather(response.data);
            } catch (error) {
                console.log(error.response)
            }
        };
        fetchData();
    }, [weatherForecastData.city]);


    if (weather.length === 0) {
        return <div className="loading">Loading data from server...</div>;
    } else {
        return (
            <div>
                <CitySelectorComponent/>

                <div className="weather-container">
                    <TodayWeatherComponent weather={weather}/>
                    <WeatherForecastComponent/>
                </div>
            </div>
        );
    }
}