import React, {useContext} from 'react';

// Data context
import {WeatherForecastDataContext} from "../../../../context/WeatherForecastDataContext";

// Chart related
import ChartComponent from "../ChartComponent";
import WeatherIcons from "../WeatherIcons";

//**************************************************//

function PressureChart() {
    const [weatherForecastData] = useContext(WeatherForecastDataContext);

    const chartYAxisValues = () => {
        const dataSpacing = 2; // Values on y axis will be divisible by this number. Eg.: 5 -> 25 20 15 10 5 0

        let max = (Math.round(Math.max(...weatherForecastData.pressure) / dataSpacing)) * dataSpacing + dataSpacing;
        let min = (Math.round(Math.min(...weatherForecastData.pressure) / dataSpacing)) * dataSpacing - dataSpacing;
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
                <ChartComponent data={weatherForecastData.pressure}
                                seriesName={"Pressure hPa"}
                                title={'Daily atmospheric pressure on sea level'}
                                color={"#a8dd52"}
                                chartYAxisValues={chartYAxisValues()}
                                xAxisCategories={weatherForecastData.dayNames}
                                unitOfMeasure={' hPa'}
                />
            </div>
        </div>
    );
}

export default PressureChart;