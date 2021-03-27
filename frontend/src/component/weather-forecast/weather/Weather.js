import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import TodayWeatherComponent from "./TodayWeatherComponent";
import WeatherForecastComponent from "./WeatherForecastComponent";
import CitySelectorComponent from "./CitySelectorComponent";
import '../../../stylesheet/weather/Today_Weather.css';
import '../../../stylesheet/weather/Forecast_Weather.css';
import '../../../stylesheet/weather/City_Selector.css';
import '../../../stylesheet/weather/Weather_forecast.css';
import {WeatherForecastDataContext} from "../../../context/WeatherForecastDataContext";

export default function Weather() {
    const [weather, setWeather] = useState([]);
    const [weatherForecastData, setWeatherForecastData] = useContext(WeatherForecastDataContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${weatherForecastData.city}&appid=2f87d7c500d9f76007f8a61f4d3270b6`);
                setWeatherForecastData(prevData => ({
                    ...prevData,
                    lat: response.data.coord.lat,
                    long: response.data.coord.lon
                }))

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