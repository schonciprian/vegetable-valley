import React, {useEffect, useState} from "react";
import axios from "axios";
import TodayWeatherComponent from "./TodayWeatherComponent";
import WeatherForecastComponent from "./WeatherForecastComponent";
import CitySelectorComponent from "./CitySelectorComponent";
import '../../stylesheet/weather/Today_Weather.css';
import '../../stylesheet/weather/Forecast_Weather.css';
import '../../stylesheet/weather/City_Selector.css';



export default function Weather() {
    const [weather, setWeather] = useState([]);
    const [city, setCity] = useState("Budapest");
    const [coordinate, setCoordinate] = useState({});
    const [, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f913779188ecd17807fa0473780a29fb`);
                setCoordinate(response.data.coord)
                setWeather(response.data);
            } catch (error) {
                setIsError(true);
                console.log(error.response)
            }
        };
        fetchData();
    }, [city]);


    if (weather.length === 0) {
        return <div className="loading">Loading data from server...</div>;
    } else {
        return (
            <div>
                <CitySelectorComponent setCity={setCity}/>

                <div className="weather-container">
                    <TodayWeatherComponent weather={weather}/>
                    <WeatherForecastComponent coordinate={coordinate}/>
                </div>
            </div>
        );
    }
}