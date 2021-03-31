import React, {useContext, useState} from 'react';
import TemperatureChart from "./TemperatureChart";
import WindChart from "./WindChart";
import {showCitySelection} from "../CitySelectorHelperVariables";
import {MapPin} from "react-feather";
import CitySelectorComponent from "../CitySelectorComponent";
import {WeatherForecastDataContext} from "../../../context/WeatherForecastDataContext";
import '../../../stylesheet/weather/Charts.css';

function Charts(props) {
    const [weatherForecastData] = useContext(WeatherForecastDataContext);
    const [selectedChart, setSelectedChart] = useState("Temperature");

    const renderSelectedChartComponent = () => {
        switch (selectedChart) {
            case "Temperature":
                return <TemperatureChart />;
            case "Wind":
                return <WindChart/>;
            default:
                return <TemperatureChart />;
        }
    }

    return (
        <div>
            <div className="charts-info-box">
                <h1>Currently selected: <span>{weatherForecastData.city}</span></h1>

                <div className="chart-type-selection">
                    <ul>
                        <li id="Temperature" onClick={event => {setSelectedChart(event.target.id); console.log(event.target.id)}}>Temperature</li>
                        <li id="Temperature" onClick={event => {setSelectedChart(event.target.id); console.log(event.target.id)}}>Temperature</li>
                        <li id="Temperature" onClick={event => {setSelectedChart(event.target.id); console.log(event.target.id)}}>Temperature</li>
                        <li id="Wind" onClick={event => setSelectedChart(event.target.id)}>Wind</li>
                        <li id="Wind" onClick={event => setSelectedChart(event.target.id)}>Wind</li>
                        <li id="Wind" onClick={event => setSelectedChart(event.target.id)}>Wind</li>
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

            {/************************/}
            {/** Locations (hidden) **/}
            {/************************/}
            <CitySelectorComponent/>

            {/******************************/}
            {/** Rendered chart component **/}
            {/******************************/}
            {renderSelectedChartComponent()}
        </div>
    );
}

export default Charts;