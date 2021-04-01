import React, {useContext} from 'react';

// Data context
import {WeatherForecastDataContext} from "../../../../context/WeatherForecastDataContext";

// Chart related
import ChartComponent from "../ChartComponent";
import WeatherIcons from "../WeatherIcons";

//**************************************************//

function UviChart() {
    const [weatherForecastData] = useContext(WeatherForecastDataContext);

    const chartYAxisValues = () => {
        const dataSpacing = 2; // Values on y axis will be divisible by this number. Eg.: 5 -> 25 20 15 10 5 0

        let max = (Math.round(Math.max(...weatherForecastData.uvi) / dataSpacing)) * dataSpacing + dataSpacing;
        let min = (Math.round(Math.min(...weatherForecastData.uvi) / dataSpacing)) * dataSpacing - dataSpacing;
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
                <ChartComponent data={weatherForecastData.uvi}
                                seriesName={"UVI"}
                                title={'Maximum value of UV index'}
                                color={"#b93fee"}
                                chartYAxisValues={chartYAxisValues()}
                                xAxisCategories={weatherForecastData.dayNames}
                                unitOfMeasure={''}
                />
            </div>
        </div>
    );
}

export default UviChart;