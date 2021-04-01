import React, {useContext} from 'react';

// Data context
import {WeatherForecastDataContext} from "../../../../context/WeatherForecastDataContext";

// Chart related
import ChartComponent from "../ChartComponent";
import WeatherIcons from "../WeatherIcons";

//**************************************************//

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
            <div className="charts">
                <div className="chart">
                    <WeatherIcons weatherIcons={weatherForecastData.weatherIcons}/>
                    <ChartComponent data={weatherForecastData.avgTemp}
                                    seriesName={"Temperature °C"}
                                    title={'Daily average temperature'}
                                    color={"#ff8c00"}
                                    chartYAxisValues={chartYAxisValues()}
                                    xAxisCategories={weatherForecastData.dayNames}
                                    unitOfMeasure={'°C'}
                    />
                </div>

                <div className="chart">
                    <WeatherIcons weatherIcons={weatherForecastData.weatherIcons}/>
                    <ChartComponent data={weatherForecastData.maxTemp}
                                    seriesName={"Temperature °C"}
                                    title={'Daily maximum temperature'}
                                    color={"#d40505"}
                                    chartYAxisValues={chartYAxisValues()}
                                    xAxisCategories={weatherForecastData.dayNames}
                                    unitOfMeasure={'°C'}
                    />
                </div>

                <div className="chart">
                    <WeatherIcons weatherIcons={weatherForecastData.weatherIcons}/>
                    <ChartComponent data={weatherForecastData.minTemp}
                                    seriesName={"Temperature °C"}
                                    title={'Daily minimum temperature'}
                                    color={"#00adfc"}
                                    chartYAxisValues={chartYAxisValues()}
                                    xAxisCategories={weatherForecastData.dayNames}
                                    unitOfMeasure={'°C'}
                    />
                </div>

            </div>
    );
}

export default TemperatureChart;