import React, {useContext} from 'react';

// Data context
import {WeatherForecastDataContext} from "../../../../context/WeatherForecastDataContext";

// Chart related
import ChartComponent from "../ChartComponent";
import WeatherIcons from "../WeatherIcons";

//**************************************************//

function RainChart() {
    const [weatherForecastData] = useContext(WeatherForecastDataContext);

    const chartYAxisValuesForRain = () => {
        const dataSpacing = 5; // Values on y axis will be divisible by this number. Eg.: 5 -> 25 20 15 10 5 0

        let max = (Math.round(Math.max(...weatherForecastData.rain) / dataSpacing)) * dataSpacing + dataSpacing;
        let min = 0;
        let tickAmount = ((max - min) / dataSpacing);

        return {
            max: max,
            min: min,
            tickAmount: tickAmount,
        };
    }

    const chartYAxisValuesForProbability = () => {
        const dataSpacing = 10; // Values on y axis will be divisible by this number. Eg.: 5 -> 25 20 15 10 5 0

        let max = (Math.ceil(Math.max(...weatherForecastData.pop) / dataSpacing)) * dataSpacing;
        let min = 0;
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
                <ChartComponent data={weatherForecastData.rain}
                                seriesName={"Rain mm"}
                                title={'Daily precipitation volume'}
                                color={"#6780f6"}
                                chartYAxisValues={chartYAxisValuesForRain()}
                                xAxisCategories={weatherForecastData.dayNames}
                                unitOfMeasure={'mm'}
                />
            </div>

            <div className="chart">
                <WeatherIcons weatherIcons={weatherForecastData.weatherIcons}/>
                <ChartComponent data={weatherForecastData.pop}
                                seriesName={"Probability %"}
                                title={'Daily probability of rain'}
                                color={"#ec9972"}
                                chartYAxisValues={chartYAxisValuesForProbability()}
                                xAxisCategories={weatherForecastData.dayNames}
                                unitOfMeasure={'%'}
                />
            </div>
        </div>
    );
}

export default RainChart;