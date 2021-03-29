import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

export const WeatherForecastDataContext = createContext([]);

export const WeatherForecastDataProvider = (props) => {
    const [weatherForecastData, setWeatherForecastData] = useState({
        city: "Budapest",
        lat: 47.498,
        long: 19.0399,
        avgTemp: [],
        maxTemp: [],
        minTemp: [],
        weatherIcons: []
    });

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherForecastData.lat}&lon=${weatherForecastData.long}&units=metric&exclude=minutely,hourly&appid=f913779188ecd17807fa0473780a29fb`)
            .then(result => {
                fillWeatherForecastDataWithTemperature(result)
            })
    })

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherForecastData.lat}&lon=${weatherForecastData.long}&units=metric&exclude=minutely,hourly&appid=f913779188ecd17807fa0473780a29fb`)
            .then(result => {
                // Prevent stacking data need to empty the arrays
                weatherForecastData.avgTemp.length = 0;
                weatherForecastData.maxTemp.length = 0;
                weatherForecastData.minTemp.length = 0;
                weatherForecastData.weatherIcons.length = 0;
                fillWeatherForecastDataWithTemperature(result)
            })
    })

    const fillWeatherForecastDataWithTemperature = (result) => {
        result.data.daily.forEach((dayData) => {
            weatherForecastData.avgTemp.push(dayData.temp.day)
            weatherForecastData.maxTemp.push(dayData.temp.max)
            weatherForecastData.minTemp.push(dayData.temp.min)
            weatherForecastData.weatherIcons.push(dayData.weather[0].icon);
        })
    }

    console.log(weatherForecastData);

    return (
        <WeatherForecastDataContext.Provider value={[weatherForecastData, setWeatherForecastData]}>
            {props.children}
        </WeatherForecastDataContext.Provider>
    );
};