import React, {useState} from 'react';
import TemperatureChart from "./TemperatureChart";

function Charts(props) {
    const [selectedChart, setSelectedChart] = useState("Temperature");

    const renderSelectedChartComponent = () => {
        switch (selectedChart) {
            case "Temperature":
                return <TemperatureChart />;
            case "Wind":
                return <div>Hello wind</div>;
            default:
                return <TemperatureChart />;
        }
    }

    return (
        <div>
            <div style={{color: "darkorange"}} onClick={() => setSelectedChart(selectedChart === "Temperature" ? "Wind" : "Temperature")}>Click me</div>
            {renderSelectedChartComponent()}
        </div>
    );
}

export default Charts;