import React, {useContext} from 'react';
import ForecastChart from "./ForecastChart";
import {WeatherForecastDataContext} from "../../../context/WeatherForecastDataContext";
import WeatherIcons from "./WeatherIcons";
import {showCitySelection} from "../weather/CitySelectorHelperVariables";
import {MapPin} from "react-feather";
import CitySelectorComponent from "../weather/CitySelectorComponent";

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
                <div className="location-container">
                    <button className="location-button"
                            onClick={showCitySelection}>
                        <MapPin className="location-icon"/>
                        <span>Change location</span>
                    </button>
                </div>
                <CitySelectorComponent/>
                <div className="chart">
                    <WeatherIcons weatherIcons={weatherForecastData.weatherIcons}/>
                    <ForecastChart data={weatherForecastData.avgTemp}
                                   title={'Daily average temperature'}
                                   color={"#ff8c00"}
                                   chartYAxisValues={chartYAxisValues()}
                    />
                </div>

                <div className="chart">
                    <WeatherIcons weatherIcons={weatherForecastData.weatherIcons}/>
                    <ForecastChart data={weatherForecastData.maxTemp}
                                   title={'Daily max temperature'}
                                   color={"#d40505"}
                                   chartYAxisValues={chartYAxisValues()}
                    />
                </div>

                <div className="chart">
                    <WeatherIcons weatherIcons={weatherForecastData.weatherIcons}/>
                    <ForecastChart data={weatherForecastData.minTemp}
                                   title={'Daily min temperature'}
                                   color={"#00adfc"}
                                   chartYAxisValues={chartYAxisValues()}
                    />
                </div>

            </div>
            : <React.Fragment/>
    );
}

export default TemperatureChart;