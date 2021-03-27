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
        // wind: [],
    });

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherForecastData.lat}&lon=${weatherForecastData.long}&units=metric&exclude=minutely,hourly&appid=2f87d7c500d9f76007f8a61f4d3270b6`)
            .then(result => {
                result.data.daily.forEach((dayData) => {
                    weatherForecastData.avgTemp.push(dayData.temp.day)
                    weatherForecastData.maxTemp.push(dayData.temp.max)
                    weatherForecastData.minTemp.push(dayData.temp.min)
                    // weatherForecastData.wind.push(parseInt((dayData.wind_speed*3.6).toFixed(2)))
                })
            })
    }, [weatherForecastData.avgTemp, weatherForecastData.maxTemp, weatherForecastData.minTemp])

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherForecastData.lat}&lon=${weatherForecastData.long}&units=metric&exclude=minutely,hourly&appid=2f87d7c500d9f76007f8a61f4d3270b6`)
            .then(result => {
                // Prevent stacking data need to empty the arrays
                weatherForecastData.avgTemp.length = 0;
                weatherForecastData.maxTemp.length = 0;
                weatherForecastData.minTemp.length = 0;

                result.data.daily.forEach((dayData) => {
                    weatherForecastData.avgTemp.push(dayData.temp.day)
                    weatherForecastData.maxTemp.push(dayData.temp.max)
                    weatherForecastData.minTemp.push(dayData.temp.min)
                    // weatherForecastData.wind.push(parseInt((dayData.wind_speed*3.6).toFixed(2)))
                })

            })
    }, [weatherForecastData])

    console.log(weatherForecastData);

    return (
        <WeatherForecastDataContext.Provider value={[weatherForecastData, setWeatherForecastData]}>
            {props.children}
        </WeatherForecastDataContext.Provider>
    );
};