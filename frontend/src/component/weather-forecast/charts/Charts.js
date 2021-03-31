import React, {useContext, useState} from 'react';
import TemperatureChart from "./TemperatureChart";
import WindChart from "./WindChart";
import {showCitySelection} from "../CitySelectorHelperVariables";
import {MapPin} from "react-feather";
import CitySelectorComponent from "../CitySelectorComponent";
import {WeatherForecastDataContext} from "../../../context/WeatherForecastDataContext";

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
            <div className="location-container">
                <button className="location-button"
                        onClick={showCitySelection}>
                    <MapPin className="location-icon"/>
                    <span>Change location</span>
                    <span> from {weatherForecastData.city}</span>
                </button>
            </div>
            <CitySelectorComponent/>
            <div style={{color: "darkorange"}} onClick={() => setSelectedChart(selectedChart === "Temperature" ? "Wind" : "Temperature")}>Click me</div>
            {renderSelectedChartComponent()}
        </div>
    );
}

export default Charts;