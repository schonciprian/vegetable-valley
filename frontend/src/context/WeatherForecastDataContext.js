import React, {useState, createContext, useEffect} from "react";
import axios from "axios";

export const WeatherForecastDataContext = createContext([]);

export const WeatherForecastDataProvider = (props) => {
    const [weatherForecastData, setWeatherForecastData] = useState({
        city: "Budapest",
        avgTemp: [],
        maxTemp: [],
        minTemp: [],
        // wind: [],
    });

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=47.498&lon=19.0399&units=metric&exclude=minutely,hourly&appid=2f87d7c500d9f76007f8a61f4d3270b6`)
            .then(result => {
                result.data.daily.forEach((dayData) => {
                    weatherForecastData.avgTemp.push(dayData.temp.day)
                    weatherForecastData.maxTemp.push(dayData.temp.max)
                    weatherForecastData.minTemp.push(dayData.temp.min)
                    // weatherForecastData.wind.push(parseInt((dayData.wind_speed*3.6).toFixed(2)))
                })
            })
    }, [])

    console.log(weatherForecastData);

    return (
        <WeatherForecastDataContext.Provider value={[weatherForecastData, setWeatherForecastData]}>
            {props.children}
        </WeatherForecastDataContext.Provider>
    );
};