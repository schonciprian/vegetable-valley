import React, {useState, createContext, useEffect} from "react";
import axios from "axios";
import {getDayName, getMonth} from "../component/weather-forecast/weather/TodayWeatherFunctions";

export const WeatherForecastDataContext = createContext([]);

export const WeatherForecastDataProvider = (props) => {
    const [weatherForecastData, setWeatherForecastData] = useState({
        city: "Budapest",
        lat: 47.498,
        long: 19.0399,
        avgTemp: [],
        maxTemp: [],
        minTemp: [],
        weatherIcons: [],
        wind: [],
        dayNames: [],
        rain: [],
    });

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherForecastData.lat}&lon=${weatherForecastData.long}&units=metric&exclude=minutely,hourly&appid=f913779188ecd17807fa0473780a29fb`)
            .then(result => {
                fillWeatherForecastData(result)
            })
    }, [weatherForecastData.lat, weatherForecastData.long])

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${weatherForecastData.city}&appid=f913779188ecd17807fa0473780a29fb`)
            .then(response => {
                setWeatherForecastData(prevData => ({
                    ...prevData,
                    lat: response.data.coord.lat,
                    long: response.data.coord.lon
                }))
            })

    }, [weatherForecastData.city])

    const fillWeatherForecastData = (result) => {
        let avgTemp = []
        let minTemp = []
        let maxTemp = []
        let weatherIcons = []
        let wind = []
        let dayNames = []
        let rain = []
        let clouds = []

        result.data.daily.forEach((dayData) => {
            avgTemp.push(dayData.temp.day);
            maxTemp.push(dayData.temp.max);
            minTemp.push(dayData.temp.min);
            weatherIcons.push(dayData.weather[0].icon);
            wind.push((dayData.wind_speed * 3.6).toFixed(0));

            let sunrise = new Date((dayData.sunrise) * 1000);
            dayNames.push([`${getMonth(sunrise.getMonth())} ${sunrise.getDate()} - ${getDayName(sunrise.getDay()).substring(0,3)}`]);

            rain.push(dayData.rain ?? 0);
            clouds.push(dayData.clouds);
        })

        setWeatherForecastData(prevData => ({
            ...prevData,
            avgTemp: avgTemp,
            maxTemp: maxTemp,
            minTemp: minTemp,
            weatherIcons: weatherIcons,
            wind: wind,
            dayNames: dayNames,
            rain: rain,
            clouds: clouds,
        }))
    }

    return (
        <WeatherForecastDataContext.Provider value={[weatherForecastData, setWeatherForecastData]}>
            {props.children}
        </WeatherForecastDataContext.Provider>
    );
};