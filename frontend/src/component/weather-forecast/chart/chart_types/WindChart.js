import React, {useContext} from 'react';

// Data context
import {WeatherForecastDataContext} from "../../../../context/WeatherForecastDataContext";

// Chart related
import ChartComponent from "../ChartComponent";
import WeatherIcons from "../WeatherIcons";

//**************************************************//

function WindChart() {
    const [weatherForecastData] = useContext(WeatherForecastDataContext);

    const chartYAxisValues = () => {
        const dataSpacing = 5; // Values on y axis will be divisible by this number. Eg.: 5 -> 25 20 15 10 5 0

        let max = (Math.ceil(Math.max(...weatherForecastData.wind) / dataSpacing)) * dataSpacing + dataSpacing;
        let min = (Math.floor(Math.min(...weatherForecastData.wind) / dataSpacing)) * dataSpacing - dataSpacing;
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
                <ChartComponent data={weatherForecastData.wind}
                                seriesName={"Wind km/h"}
                                title={'Daily average wind speed'}
                                color={"#d6d2ae"}
                                chartYAxisValues={chartYAxisValues()}
                                xAxisCategories={weatherForecastData.dayNames}
                                unitOfMeasure={' km/h'}
                />
            </div>
        </div>
    );
}

export default WindChart;