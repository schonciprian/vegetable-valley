import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class Chartt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: "Temperature",
                data: props.data,
            }],
            options: {
                chart: {
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
                },
                colors: ['darkorange'],

                dataLabels: {
                    enabled: true,
                    offsetY: -10,
                    formatter: function(value) {
                        return value + '°C'
                    },
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 'bold',
                        colors: ['darkorange']
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
                        fontSize:  '20px',
                        fontWeight:  'bold',
                        fontFamily:  'Montserrat, sans-serif',
                        color:  '#eee'
                    },
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
                },
                xaxis: {
                    categories: ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                    labels: {
                        style: {
                            colors: [
                                '#eee', // Next day
                                '#eee', // Day after tomorrow
                                '#eee', // 3rd day from now
                                '#eee', // 4th day from now
                                '#eee', // 5th day from now
                                '#eee', // 6th day from now
                                '#eee', // One week from now
                            ],
                            fontSize: '15px',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 400,
                        },
                        offsetY: 5,
                        minHeight: 60,
                    },
                    axisBorder: {
                        color: 'darkorange',
                        offsetX: 0,
                        offsetY: 10,
                    },
                    axisTicks: {
                        color: 'darkorange',
                    },
                },
                yaxis: {
                    min: 5,
                    max: 20,
                    tickAmount: 3,
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
                        color: 'darkorange',
                    },
                    axisTicks: {
                        show: true,
                        color: 'darkorange',
                    },
                }
            },
        };
    }


    render() {
        return (
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="line" height={350} width={600}/>
            </div>)
    }
}
