import React from "react";
import Chart from "react-apexcharts";

export default function ForecastChart(props) {

    return <div className="chart">
        <Chart options={{
            chart: {
                background: '#1B223E',
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                },
                dropShadow: {
                    enabled: true,
                    color: '#fff',
                    top: 10,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                toolbar: {
                    colors: "red",
                }
            },
            colors: [props.color],

            dataLabels: {
                enabled: true,
                offsetY: -10,
                formatter: function (value) {
                    return value + '°C'
                },
                style: {
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 'bold',
                    colors: [props.color]
                },
                background: {
                    enabled: false,
                    foreColor: '#fff',
                    padding: 4,
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: '#fff',
                    opacity: 0.9,
                    dropShadow: {
                        enabled: false,
                        top: 1,
                        left: 1,
                        blur: 1,
                        color: '#000',
                        opacity: 0.45
                    }
                },
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: props.title,
                align: 'center',
                style: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#eee'
                },
                margin: 50,
            },
            grid: {
                strokeDashArray: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                yaxis: {
                    lines: {
                        show: true
                    }
                },
                row: {
                    colors: ['transparent'], // takes an array which will be repeated on columns
                },
                padding: {
                    right: 30,
                },
            },
            markers: {
                size: 3,
                colors: props.color,
                hover: {
                    size: 6,
                }
            },
            xaxis: {
                categories: ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', "Friday"],
                labels: {
                    rotateAlways: true,
                    style: {
                        colors: [
                            '#eee', // Next day
                            '#eee', // Day after tomorrow
                            '#eee', // 3rd day from now
                            '#eee', // 4th day from now
                            '#eee', // 5th day from now
                            '#eee', // 6th day from now
                            '#eee', // One week from now
                            '#eee', // One week + 1
                        ],
                        fontSize: '15px',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 400,
                    },
                    offsetY: 5,
                    minHeight: 100,
                },
                axisBorder: {
                    color: '#eee',
                    offsetX: 0,
                    offsetY: 10,
                },
                axisTicks: {
                    color: '#eee',
                },
            },
            yaxis: {
                min: props.chartYAxisValues.min,
                max: props.chartYAxisValues.max,
                tickAmount: props.chartYAxisValues.tickAmount,
                labels: {
                    style: {
                        colors: ['#eee'],
                        fontSize: '15px',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 400,
                    },
                    offsetX: -30,
                    minWidth: 80,
                },
                axisBorder: {
                    show: true,
                    color: '#eee',
                },
                axisTicks: {
                    show: true,
                    color: '#eee',
                },
            }
        }}
               series={[{
                   name: "Temperature",
                   data: props.data,
               }]}
               type="line"
               height={400}
               width={600}/>
    </div>
}
