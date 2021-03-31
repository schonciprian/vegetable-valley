import React, {useContext} from 'react';

// Data context
import {WeatherForecastDataContext} from "../../../../context/WeatherForecastDataContext";

// Chart related
import ChartComponent from "../ChartComponent";
import WeatherIcons from "../WeatherIcons";

//**************************************************//

function HumidityChart() {
    const [weatherForecastData] = useContext(WeatherForecastDataContext);
    console.log(weatherForecastData.humidity);
    const chartYAxisValues = () => {
        const dataSpacing = 10; // Values on y axis will be divisible by this number. Eg.: 5 -> 25 20 15 10 5 0

        let max = (Math.round(Math.max(...weatherForecastData.humidity) / dataSpacing)) * dataSpacing + dataSpacing;
        let min = (Math.round(Math.min(...weatherForecastData.humidity) / dataSpacing)) * dataSpacing - dataSpacing;
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
                <ChartComponent data={weatherForecastData.humidity}
                                seriesName={"Humidity %"}
                                title={'Daily humidity forecast'}
                                color={"#94a2ea"}
                                chartYAxisValues={chartYAxisValues()}
                                xAxisCategories={weatherForecastData.dayNames}
                                unitOfMeasure={'%'}
                />
            </div>
        </div>
    );
}

export default HumidityChart;