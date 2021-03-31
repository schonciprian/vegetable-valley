import React, {useContext} from 'react';
import ChartComponent from "./ChartComponent";
import {WeatherForecastDataContext} from "../../../context/WeatherForecastDataContext";
import WeatherIcons from "./WeatherIcons";
import '../../../stylesheet/weather/Forecast_Weather.css';

function TemperatureChart() {
    const [weatherForecastData] = useContext(WeatherForecastDataContext);

    const chartYAxisValues = () => {
        const dataSpacing = 5; // Values on y axis will be divisible by this number. Eg.: 5 -> 25 20 15 10 5 0
        let maxTemps = [];
        let minTemps = [];

        weatherForecastData.maxTemp.forEach((number) => {
            maxTemps.push(Math.round(number / dataSpacing) * dataSpacing + dataSpacing)
        });

        weatherForecastData.minTemp.forEach((number) => {
            minTemps.push(Math.round(number / dataSpacing) * dataSpacing - dataSpacing)
        })

        let max = Math.max(...maxTemps);
        let min = Math.min(...minTemps);
        let tickAmount = ((max - min) / dataSpacing);

        return {
            max: max,
            min: min,
            tickAmount: tickAmount,
        };
    }

    return (
        weatherForecastData.avgTemp
            ? <div className="charts">
                <div className="chart">
                    <WeatherIcons weatherIcons={weatherForecastData.weatherIcons}/>
                    <ChartComponent data={weatherForecastData.avgTemp}
                                    title={'Daily average temperature'}
                                    color={"#ff8c00"}
                                    chartYAxisValues={chartYAxisValues()}
                                    unitOfMeasure={'°C'}
                    />
                </div>

                <div className="chart">
                    <WeatherIcons weatherIcons={weatherForecastData.weatherIcons}/>
                    <ChartComponent data={weatherForecastData.maxTemp}
                                    title={'Daily max temperature'}
                                    color={"#d40505"}
                                    chartYAxisValues={chartYAxisValues()}
                                    unitOfMeasure={'°C'}
                    />
                </div>

                <div className="chart">
                    <WeatherIcons weatherIcons={weatherForecastData.weatherIcons}/>
                    <ChartComponent data={weatherForecastData.minTemp}
                                    title={'Daily min temperature'}
                                    color={"#00adfc"}
                                    chartYAxisValues={chartYAxisValues()}
                                    unitOfMeasure={'°C'}
                    />
                </div>

            </div>
            : <React.Fragment/>
    );
}

export default TemperatureChart;