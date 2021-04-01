import React, {useContext, useState} from 'react';

// Data context
import {WeatherForecastDataContext} from "../../../context/WeatherForecastDataContext";

// Chart components by type
import TemperatureChart from "./chart_types/TemperatureChart";
import WindChart from "./chart_types/WindChart";
import RainChart from "./chart_types/RainChart";
import CloudsChart from "./chart_types/CloudsChart";
import HumidityChart from "./chart_types/HumidityChart";
import PressureChart from "./chart_types/PressureChart";
import UviChart from "./chart_types/UviChart";

// City selector related
import CitySelectorComponent from "../CitySelectorComponent";
import {showCitySelection} from "../CitySelectorHelperVariables";
import {MapPin} from "react-feather";

// Stylesheets
import '../../../stylesheet/weather/Charts.css';

//**************************************************//

function Charts() {
    const [weatherForecastData] = useContext(WeatherForecastDataContext);
    const [selectedChart, setSelectedChart] = useState("Temperature");
    const types = ["Temperature", "Wind", "Rain", "Cloudiness", "Humidity", "Pressure", "UVI",]

    const renderSelectedChartComponent = () => {
        switch (selectedChart) {
            case "Temperature":
                return <TemperatureChart/>;
            case "Wind":
                return <WindChart/>;
            case "Rain":
                return <RainChart/>;
            case "Cloudiness":
                return <CloudsChart/>;
            case "Humidity":
                return <HumidityChart/>;
            case "Pressure":
                return <PressureChart/>;
            case "UVI":
                return <UviChart/>;
            default:
                return <TemperatureChart/>;
        }
    }

    return (
        <div>
            <div className="charts-info-box">
                <h1>Currently selected: <span>{weatherForecastData.city}</span></h1>

                {/*****************/}
                {/** Chart types **/}
                {/*****************/}
                <div className="chart-type-selection">
                    <ul>
                        {types.map((type, index) => {
                            return (
                                <li key={index}
                                    id={type}
                                    className={selectedChart === type ? "active" : undefined}
                                    onClick={event => setSelectedChart(event.target.id)}>
                                    {type}
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/*********************/}
                {/** Location button **/}
                {/*********************/}
                <div className="location-container">
                    <button className="location-button"
                            onClick={showCitySelection}>
                        <MapPin className="location-icon"/>
                        <span>Change location</span>
                    </button>
                </div>
            </div>

            {/********************************/}
            {/** Location selector (hidden) **/}
            {/********************************/}
            <CitySelectorComponent/>

            {/******************************/}
            {/** Rendered chart component **/}
            {/******************************/}
            {renderSelectedChartComponent()}
        </div>
    );
}

export default Charts;