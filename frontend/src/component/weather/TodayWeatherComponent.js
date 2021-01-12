import React from 'react';
import {MapPin} from "react-feather";
import {getDayName, getMonth} from "./TodayWeatherFunctions";

export default function TodayWeatherComponent(props) {
    const weather = props.weather;

    const today = new Date((weather.dt + weather.timezone - 3600) * 1000)
    const todayWeather = {
        city: weather.name,
        country: weather.sys.country,
        dayName: getDayName(today.getDay()),
        date: today.getDate() + ' ' + getMonth(today.getMonth()) + ' ' + today.getFullYear(),
        rain: (weather.rain !== undefined ? weather.rain['1h'].toFixed(1) : 0),
        humidity: weather.main.humidity,
        windSpeed: ((weather.wind.speed)*3.6).toFixed(0),
        temp: (weather.main.temp-273.15).toFixed(1),
        weatherType: weather.weather[0].main,
        weatherIcon: weather.weather[0].icon,
    };

    // This variable also occurs in WeatherForecastComponent.js. How can i put this to TodayWeatherFunctions.js
    // to not duplicate it. It will also need todayWeather object in the other file.
    const getForecastIcon = (todayWeather.length !== 0) ?
        todayWeather.weatherIcon :
        '01d';

    return (
        <div className="today-weather-side">
            <div className="today-weather-gradient"/>

            <div className="today-location-and-date-container">
                <div className="today-location-container">
                    <MapPin/>
                    <span className="today-location">{todayWeather.city}, {todayWeather.country}</span>
                </div>

                <h2 className="today-day-name">{todayWeather.dayName}</h2>

                <span className="today-date">{todayWeather.date}</span>
            </div>

            <div className="today-weather-extras-container">
                <div className="today-extras">
                    <span>PRECIPITATION</span>
                    <span>{todayWeather.rain} mm</span>
                </div>

                <div className="today-extras">
                    <span>HUMIDITY</span>
                    <span>{todayWeather.humidity} %</span>
                </div>

                <div className="today-extras">
                    <span>WIND</span>
                    <span>{todayWeather.windSpeed} km/h</span>
                </div>
            </div>

            <div className="today-weather-container">
                <img src={`https://openweathermap.org/img/w/${getForecastIcon}.png`} alt=""/>
                <h1 className="weather-temp">{todayWeather.temp}</h1>
                <h3 className="weather-desc">{todayWeather.weatherType}</h3>
            </div>
        </div>
    );
}

