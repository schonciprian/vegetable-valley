import React, {useEffect, useState} from 'react';
import {
    getDateOfDailyForecast, getDayName, getDayNameOfDailyForecast,
    getDayTemperatureDailyForecast,
    getHumidityDailyForecast,
    getNightTemperatureDailyForecast,
    getPrecipitationDailyForecast,
    getRainDailyForecast,
    getSnowDailyForecast,
    getWindDailyForecast
} from "./WeatherForecastGetterFunctions";
import {calculateSunriseSunset, getMonth} from "./TodayWeatherFunctions";
import {MapPin, Sunrise, Sunset} from "react-feather";
import axios from "axios";

export default function WeatherForecastComponent(props) {

    const [weatherForecast, setWeatherForecast] = useState([]);
    const [indexOfDailyForecast, setIndexOfDailyForecast] = useState(0);

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.coordinate.lat}&lon=${props.coordinate.lon}&units=metric&exclude=minutely,hourly&appid=f913779188ecd17807fa0473780a29fb`)
                .then(result => setWeatherForecast(result.data));
    }, [props.coordinate.lat, props.coordinate.lon])

    const {timezone_offset, daily} = weatherForecast;
    let dailyForecast = [];
    let count = 0;

    const [showDayFromIndex, setShowDayFromIndex] = useState(0);
    const [showDayToIndex, setShowDayToIndex] = useState(4);

    if (weatherForecast.length !== 0 ) {daily.forEach( oneDay => {
        if (count > showDayFromIndex && count <= showDayToIndex) {
            let sunrise = new Date((oneDay.sunrise + timezone_offset - 3600) * 1000);
            let sunset = new Date((oneDay.sunset + timezone_offset - 3600) * 1000);

            dailyForecast.push({
                month: sunrise.getMonth() + 1,
                date: sunrise.getDate(),
                day: sunrise.getDay(),
                sunrise: calculateSunriseSunset(sunrise),
                sunset: calculateSunriseSunset(sunset),
                dailyTemp: (oneDay.temp.day).toFixed(1),
                dayTemp: oneDay.temp.day,
                nightTemp: oneDay.temp.night,
                wind: (oneDay.wind_speed).toFixed(1),
                humidity: (oneDay.humidity).toFixed(0),
                precipitation: (oneDay.pop * 100).toFixed(0),
                rain: (oneDay.rain) ? (oneDay.rain).toFixed(1) : 0,
                snow: (oneDay.snow) ? (oneDay.snow).toFixed(1) : 0,
                weather: oneDay.weather[0].main,
                weatherIcon: oneDay.weather[0].icon,
            })
        }
        count += 1;
    })}

    const changeIndexOfDailyForecast = (index) => {
        setIndexOfDailyForecast(index);
    }

    const getForecastIcon = (dailyForecast.length !== 0) ?
        dailyForecast[indexOfDailyForecast].weatherIcon :
        '01d';

    const updateShowDayIndexes = (pageNumber) => {
        setIndexOfDailyForecast(0);
        setShowDayFromIndex((pageNumber * 4) - 4);
        setShowDayToIndex(pageNumber * 4);
    }

    return (
        <div className="forecast-weather-side">
            <div className="week-list-container">
                <ul className="week-list">
                    {dailyForecast.map((oneDayForecast, index) => (
                        <li key={index}
                            className={(index === indexOfDailyForecast) ? "daily-weather-forecast active" : "daily-weather-forecast"}
                            onClick={() => changeIndexOfDailyForecast(index)}>
                            <span className="forecast-date">{getMonth(oneDayForecast.month-1)}. {oneDayForecast.date}.</span>
                            <span className="forecast-day">{getDayName(oneDayForecast.day)}</span>
                            <div className="sunrise-container">
                                <Sunrise className="sunrise-icon"/>
                                <span>{oneDayForecast.sunrise}</span>
                            </div>
                            <div className="sunset-container">
                                <Sunset className="sunset-icon"/>
                                <span>{oneDayForecast.sunset}</span>
                            </div>
                            <span className="forecast-day-temp">{oneDayForecast.dailyTemp}°C</span>
                        </li>
                    ))}

                </ul>
                <div className="pagination">
                    <div className={(showDayFromIndex === 0 ? 'page-number active ' : 'page-number ')}
                         onClick={() => {updateShowDayIndexes(1)}}>
                        1
                    </div>
                    <div className={(showDayFromIndex === 4 ? 'page-number active ' : 'page-number ')}
                         onClick={() => {updateShowDayIndexes(2)}}>
                        2
                    </div>
                </div>
            </div>

            <div className="active-day-info-container">
                <div className="active-day-info">
                    <div className="forecast-data">
                        <div className="active-day-date">{getDateOfDailyForecast(dailyForecast, indexOfDailyForecast)}</div>
                        <img src={`http://openweathermap.org/img/w/${getForecastIcon}.png`} alt=""/>
                        <div className="active-day-day">{getDayNameOfDailyForecast(dailyForecast, indexOfDailyForecast)}</div>
                    </div>
                    <div className="forecast-property-container">
                        <span className="forecast-title">DAY</span>
                        <span className="forecast-value">{getDayTemperatureDailyForecast(dailyForecast, indexOfDailyForecast)} °C</span>
                    </div>
                    <div className="forecast-property-container">
                        <span className="forecast-title">NIGHT</span>
                        <span className="forecast-value">{getNightTemperatureDailyForecast(dailyForecast, indexOfDailyForecast)} °C</span>
                    </div>
                    <div className="forecast-property-container">
                        <span className="forecast-title">WIND</span>
                        <span className="forecast-value">{getWindDailyForecast(dailyForecast, indexOfDailyForecast)} km/h</span>
                    </div>
                </div>
                <div className="active-day-info">
                    <div className="forecast-property-container">
                        <span className="forecast-title">PRECIPITATION</span>
                        <span className="forecast-value">{getPrecipitationDailyForecast(dailyForecast, indexOfDailyForecast)} %</span>
                    </div>
                    <div className="forecast-property-container">
                        <span className="forecast-title">RAIN</span>
                        <span className="forecast-value">{getRainDailyForecast(dailyForecast, indexOfDailyForecast)} mm</span>
                    </div>
                    <div className="forecast-property-container">
                        <span className="forecast-title">SNOW</span>
                        <span className="forecast-value">{getSnowDailyForecast(dailyForecast, indexOfDailyForecast)} mm</span>
                    </div>
                    <div className="forecast-property-container">
                        <span className="forecast-title">HUMIDITY</span>
                        <span className="forecast-value">{getHumidityDailyForecast(dailyForecast, indexOfDailyForecast)} %</span>
                    </div>
                </div>
            </div>

            <div className="location-container">
                <button className="location-button"
                        onClick={() => {
                            document.getElementById("city-selector-container").style.display = "block";
                            document.getElementById("city-selector").style.display = "block";
                        }}>
                    <MapPin className="location-icon"/>
                    <span>Change location</span>
                </button>
            </div>
        </div>
    );
}

