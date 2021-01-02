import React, {useEffect, useState} from "react";
import axios from "axios";
import {isSafari} from "react-device-detect";
import TodayWeatherComponent from "./TodayWeatherComponent";
import WeatherForecastComponent from "./WeatherForecastComponent";


export default function Weather() {
    const [weather, setWeather] = useState([]);
    const [city, setCity] = useState("Gyor");
    const [coordinate, setCoordinate] = useState({});

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f913779188ecd17807fa0473780a29fb`)
                .then(response => {
                    setCoordinate(response.data.coord)
                    setWeather(response.data);
                })
        }, [city]);

    const handleFocus = (event) => event.target.select();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setCity(event.target.value)
            document.getElementById("city-selector-container").style.display = "none";
            document.getElementById("city-selector").style.display = "none";
            document.getElementById("city-input").value = "";
        }
    }

    const getCoordinates = (position) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${(position.coords.latitude)}&lon=${(position.coords.longitude)}&appid=f913779188ecd17807fa0473780a29fb`)
            .then(response => {
                setCity(response.data.name)
            })
    }

    const getLocation = () => {
        document.getElementById("city-selector-container").style.display = "none";
        document.getElementById("city-selector").style.display = "none";
        if (!isSafari) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getCoordinates, () => {
                    alert("Your location is not available. ");})
            } else {
                alert("Your location is not available");
            }
        } else {
            alert("This option not available on your device")
        }
    }


    if (weather.length === 0) {
        return <div className="loading">Loading data from server...</div>;
    } else {
        return (
            <div>
                <div id="city-selector-container"
                     className="city-selector-container"
                     style={{display: "none"}}
                     onClick={() => {
                         document.getElementById("city-selector-container").style.display = "none";
                         document.getElementById("city-selector").style.display = "none";
                     }}/>

                <div id="city-selector" className="city-selector" style={{display: "none"}}>
                    <div className="city-input-container">
                        <div className="city-input-text">Which city are you curious about?</div>
                        <input id="city-input"
                               className="city-input"
                               onKeyDown={handleKeyDown}
                               onClick={handleFocus}/>
                    </div>
                    <div className="city-list-container">
                        <div className="city-list-container-left">
                            <div className="get-location" onClick={getLocation}>Click here to get your location</div>

                            <div className="city-list-hungary">
                                <div className="city-list-title">Chief towns of counties</div>
                                <ul>
                                    <li onClick={() => {setCity("Budapest");
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Budapest</li>
                                    <li onClick={() => {setCity('Bekescsaba');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Bekescsaba</li>
                                    <li onClick={() => {setCity('Debrecen');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Debrecen</li>
                                    <li onClick={() => {setCity('Eger');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Eger</li>
                                    <li onClick={() => {setCity('Gyor');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Gyor</li>
                                    <li onClick={() => {setCity('Kaposvar');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Kaposvar</li>
                                    <li onClick={() => {setCity('Kecskemet');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Kecskemet</li>
                                    <li onClick={() => {setCity('Miskolc');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Miskolc</li>
                                    <li onClick={() => {setCity('Nyiregyhaza');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Nyiregyhaza</li>
                                    <li onClick={() => {setCity('Pecs');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Pecs</li>
                                    <li onClick={() => {setCity('Salgotarjan');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Salgotarjan</li>
                                    <li onClick={() => {setCity('Szeged');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Szeged</li>
                                    <li onClick={() => {setCity('Szekszard');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Szekszard</li>
                                    <li onClick={() => {setCity('Szekesfehervar');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Szekesfehervar</li>
                                    <li onClick={() => {setCity('Szolnok');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Szolnok</li>
                                    <li onClick={() => {setCity('Szombathely');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Szombathely</li>
                                    <li onClick={() => {setCity('Tatabanya');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Tatabanya</li>
                                    <li onClick={() => {setCity('Veszprem');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Veszprem</li>
                                    <li onClick={() => {setCity('Zalaegerszeg');
                                        document.getElementById("city-selector-container").style.display = "none";
                                        document.getElementById("city-selector").style.display = "none"}}>Zalaegerszeg</li>
                                </ul>
                            </div>
                        </div>

                        <div className="city-list-abroad">
                            <div className="city-list-title">Abroad</div>
                            <ul>
                                <li onClick={() => {setCity("London");
                                    document.getElementById("city-selector-container").style.display = "none";
                                    document.getElementById("city-selector").style.display = "none"}}>London</li>
                                <li onClick={() => {setCity('Berlin');
                                    document.getElementById("city-selector-container").style.display = "none";
                                    document.getElementById("city-selector").style.display = "none"}}>Berlin</li>
                                <li onClick={() => {setCity('Paris');
                                    document.getElementById("city-selector-container").style.display = "none";
                                    document.getElementById("city-selector").style.display = "none"}}>Paris</li>
                                <li onClick={() => {setCity('Rome');
                                    document.getElementById("city-selector-container").style.display = "none";
                                    document.getElementById("city-selector").style.display = "none"}}>Rome</li>
                                <li onClick={() => {setCity('Amsterdam');
                                    document.getElementById("city-selector-container").style.display = "none";
                                    document.getElementById("city-selector").style.display = "none"}}>Amsterdam</li>
                                <li onClick={() => {setCity('Bratislava');
                                    document.getElementById("city-selector-container").style.display = "none";
                                    document.getElementById("city-selector").style.display = "none"}}>Bratislava</li>
                                <li onClick={() => {setCity('Wien');
                                    document.getElementById("city-selector-container").style.display = "none";
                                    document.getElementById("city-selector").style.display = "none"}}>Wien</li>
                                <li onClick={() => {setCity('Madrid');
                                    document.getElementById("city-selector-container").style.display = "none";
                                    document.getElementById("city-selector").style.display = "none"}}>Madrid</li>
                                <li onClick={() => {setCity('Lisbon');
                                    document.getElementById("city-selector-container").style.display = "none";
                                    document.getElementById("city-selector").style.display = "none"}}>Lisbon</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="weather-container">
                    <TodayWeatherComponent weather={weather}/>
                    <WeatherForecastComponent coordinate={coordinate}/>
                </div>
            </div>
        );
    }
}