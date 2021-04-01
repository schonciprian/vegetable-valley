import React, {useContext} from 'react';

// Data context
import {WeatherForecastDataContext} from "../../../../context/WeatherForecastDataContext";

// Chart related
import ChartComponent from "../ChartComponent";
import WeatherIcons from "../WeatherIcons";

//**************************************************//

function RainChart() {
    const [weatherForecastData] = useContext(WeatherForecastDataContext);

    const chartYAxisValues = () => {
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

    return (
        <div className="charts">
            <div className="chart">
                <WeatherIcons weatherIcons={weatherForecastData.weatherIcons}/>
                <ChartComponent data={weatherForecastData.rain}
                                seriesName={"Rain mm"}
                                title={'Daily rain forecast'}
                                color={"#3052f6"}
                                chartYAxisValues={chartYAxisValues()}
                                xAxisCategories={weatherForecastData.dayNames}
                                unitOfMeasure={'mm'}
                />
            </div>
        </div>
    );
}

export default RainChart;