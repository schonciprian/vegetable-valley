import React, {useContext} from 'react';
import WeatherIcons from "./WeatherIcons";
import ChartComponent from "./ChartComponent";
import {WeatherForecastDataContext} from "../../../context/WeatherForecastDataContext";

function WindChart(props) {
    const [weatherForecastData] = useContext(WeatherForecastDataContext);

    console.log(weatherForecastData.wind);

    return (
        <div className="charts">
            <div className="chart">
                <WeatherIcons weatherIcons={weatherForecastData.weatherIcons}/>
                <ChartComponent data={weatherForecastData.wind}
                                title={'Daily average wind speed'}
                                color={"#ff8c00"}
                                chartYAxisValues={{
                                    max: 30,
                                    min: 0,
                                    tickAmount: 6,
                                }}
                                unitOfMeasure={' km/h'}
                />
            </div>
        </div>
    );
}

export default WindChart;