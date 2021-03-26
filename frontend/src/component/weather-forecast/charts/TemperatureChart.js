import React from 'react';
import Chart from "./Chart";

function TemperatureChart(props) {
    return (
        <div className="charts">
            <Chart data={[12.4, 14.6, 9.5, 12.0, 15.9, 15.8, 15.9]} title={'Daily average temperature'} color={"#ff8c00"}/>
            <Chart data={[15.4, 18.6, 10.5, 16.0, 13.9, 18.8, 19.9]} title={'Daily max temperature'} color={"#d40505"}/>
            <Chart data={[10.4, 9.6, 6.5, 8.0, 13.9, 11.8, 12.9]} title={'Daily min temperature'} color={"#00adfc"}/>
        </div>
    );
}

export default TemperatureChart;