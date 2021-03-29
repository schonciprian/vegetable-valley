import React, {useContext} from 'react';
import Chart from "./Chart";
import {WeatherForecastDataContext} from "../../../context/WeatherForecastDataContext";
import WeatherIcons from "./WeatherIcons";

function TemperatureChart() {
    const [weatherForecastData] = useContext(WeatherForecastDataContext);

    return (
        weatherForecastData.avgTemp
            ? <div className="charts">
                <div className="chart">
                    <WeatherIcons />
                    <Chart data={weatherForecastData.avgTemp} title={'Daily average temperature'} color={"#ff8c00"}/>
                </div>

                <div className="chart">
                    <WeatherIcons />
                    <Chart data={weatherForecastData.maxTemp} title={'Daily max temperature'} color={"#d40505"}/>
                </div>

                <div className="chart">
                    <WeatherIcons />
                    <Chart data={weatherForecastData.minTemp} title={'Daily min temperature'} color={"#00adfc"}/>
                </div>

                {/*<Chart data={weatherForecastData.wind} title={'Daily min temperature'} color={"#00adfc"}/>*/}
            </div>
            : <React.Fragment/>
    );
}

export default TemperatureChart;