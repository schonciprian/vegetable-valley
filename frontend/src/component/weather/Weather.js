import React, {useEffect, useState} from "react";
import axios from "axios";
import {MapPin, Sun, Sunrise, Sunset} from 'react-feather';


export default function Weather() {
    const [weather, setWeather] = useState([]);
    const [weatherForecast, setWeatherForecast] = useState([]);
    const [city, setCity] = useState("Gyor");
    // QUESTION: if I want to set the coordinates in the first API call and the second wants to use it
    // it will use the previous coordinates despite of it knows the correct coordinates.
    // For make working it well, I need to set longitude and latitude separately, but why?
    // const [coordinate, setCoordinate] = useState({"lon":17.64,"lat":47.68});
    let latitude;
    let longitude;


    useEffect(() => axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f6c317d5027246f70ca2f9fcbc4ea46c`)
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

    let {temp, /*feels_like, temp_min, temp_max, pressure*/} = weather.main;
    temp = (temp-273.15).toFixed(1);
    // feels_like = (feels_like-273.15).toFixed(1);
    // temp_min = (temp_min-273.15).toFixed(1);
    // temp_max = (temp_max-273.15).toFixed(1);

    const windSpeed = ((weather.wind.speed)*3.6).toFixed(1);

    const {main, /*description*/} = weather.weather[0];
    const weatherType = main;
    // const weatherTypeDescription = description;

    const cityName = weather.name;
    const country = weather.sys.country;

    let {daily} = weatherForecast;
    let dailyForecast = [];

    let count = 0;

    if (weatherForecast.length !== 0 ) {daily.forEach( oneDay => {
        if (count > 0 && count < 5) {
            let sunrise = new Date(oneDay.sunrise * 1000);
            let sunset = new Date(oneDay.sunset * 1000);

            dailyForecast.push({
                date: sunrise.getDate(),
                day: sunrise.getDay(),
                sunrise: (sunrise.getHours() < 10 ? '0' + sunrise.getHours() : sunrise.getHours()) +
                    ':' +
                    (sunrise.getMinutes() < 10 ? '0' + sunrise.getMinutes() : sunrise.getMinutes())  +
                    ':' +
                    (sunrise.getSeconds() < 10 ? '0' + sunrise.getSeconds() : sunrise.getSeconds()),
                sunset: (sunset.getHours() < 10 ? '0' + sunset.getHours() : sunset.getHours()) +
                    ':' +
                    (sunset.getMinutes() < 10 ? '0' + sunset.getMinutes() : sunset.getMinutes()) +
                    ':' +
                    (sunset.getSeconds() < 10 ? '0' + sunset.getSeconds() : sunset.getSeconds()),
                dailyTemp: (oneDay.temp.day).toFixed(1),
            })
        }
        count += 1;
    })}

    const getDay = (day) => {
        switch(day) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return 'Sunday';
        }
    }


    return (
        <div>
            <div className="weather-infos">
                <div onClick={() => setCity("Budapest")}>Budapest</div>
                <div onClick={() => setCity("Győr")}>Győr</div>
                <div onClick={() => setCity("Pápa")}>Pápa</div>
                <div onClick={() => setCity("Mosonmagyaróvár")}>Mosonmagyaróvár</div>
                <div onClick={() => setCity("Budapest XVIII. kerület")}>XVIII kerület</div>
                <div onClick={() => setCity("London")}>London</div>
                <div onClick={() => setCity("Barcelona")}>Barcelona</div>
                <div onClick={() => setCity("Moskva")}>Moszkva</div>
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
                            {/*
                            <li>
                                <i className="day-icon" data-feather="cloud-rain"/>
                                <span className="day-name">Fry</span>
                                <span className="day-temp">19°C</span>
                            </li>
                            */}

                            {dailyForecast.map((oneDayForecast) => (
                                <li key={oneDayForecast.date} className="daily-weather-forecast">
                                    <Sun className="day-icon" data-feather="sun"/>
                                    <span className="day-name">{oneDayForecast.date}</span>
                                    <span className="day-name">{getDay(oneDayForecast.day)}</span>
                                    <div className="sunrise-container">
                                        <Sunrise className="sunrise-icon"/>
                                        <span className="day-name">{oneDayForecast.sunrise}</span>
                                    </div>
                                    <div className="sunset-container">
                                        <Sunset className="sunset-icon"/>
                                        <span className="day-name">{oneDayForecast.sunset}</span>
                                    </div>

                                    <span className="day-temp">{oneDayForecast.dailyTemp}°C</span>
                                </li>
                            ))}

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