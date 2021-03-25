import React, {useEffect, useState} from "react";
import axios from "axios";
import TodayWeatherComponent from "./TodayWeatherComponent";
import WeatherForecastComponent from "./WeatherForecastComponent";
import CitySelectorComponent from "./CitySelectorComponent";
import '../../stylesheet/weather/Today_Weather.css';
import '../../stylesheet/weather/Forecast_Weather.css';
import '../../stylesheet/weather/City_Selector.css';
import '../../stylesheet/weather/Weather_forecast.css';
import Chart from "./charts/Chart";



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
                <div className="charts">
                    <Chart data={[12.4, 14.6, 9.5, 12.0, 15.9, 15.8, 15.9]} title={'Daily average temperature'}/>
                    <Chart data={[15.4, 18.6, 10.5, 16.0, 13.9, 18.8, 19.9]} title={'Daily max temperature'}/>
                    <Chart data={[10.4, 9.6, 6.5, 8.0, 13.9, 11.8, 12.9]} title={'Daily min temperature'}/>
                </div>
            </div>
        );
    }
}