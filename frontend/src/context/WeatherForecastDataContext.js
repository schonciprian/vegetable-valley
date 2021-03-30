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

    const fillWeatherForecastDataWithTemperature = (result) => {
        let avgTemp = []
        let minTemp = []
        let maxTemp = []
        let weatherIcons = []

        result.data.daily.forEach((dayData) => {
            avgTemp.push(dayData.temp.day)
            maxTemp.push(dayData.temp.max)
            minTemp.push(dayData.temp.min)
            weatherIcons.push(dayData.weather[0].icon);
        })

        setWeatherForecastData(prevData => ({
            ...prevData,
            avgTemp: avgTemp,
            maxTemp: maxTemp,
            minTemp: minTemp,
            weatherIcons: weatherIcons,
        }))
    }

    return (
        <WeatherForecastDataContext.Provider value={[weatherForecastData, setWeatherForecastData]}>
            {props.children}
        </WeatherForecastDataContext.Provider>
    );
};