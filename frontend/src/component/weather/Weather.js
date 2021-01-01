import React, {useEffect, useState} from "react";
import axios from "axios";
import CitySwitcherComponent from "./CitySwitcherComponent";
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

    if (weather.length === 0) {
        return <div className="loading">Loading data from server...</div>;
    } else {
        return (
            <div>
                <CitySwitcherComponent setCity={setCity}/>
                <div id="city-selector-container"
                     className="city-selector-container"
                     style={{display: "none"}}
                     onClick={() => {
                         document.getElementById("city-selector-container").style.display = "none";
                         document.getElementById("city-selector").style.display = "none";
                     }}/>

                <div id="city-selector" className="city-selector" style={{display: "none"}}>
                    <input className="city-input" value={city} onChange={(e) => setCity(e.target.value)}/>
                    <div className="city-list-container">
                        <div className="city-list-hungary">
                            <div className="city-list-title">Chief towns of counties</div>
                            <ul>
                                <li onClick={() => setCity("Budapest")}>Budapest</li>
                                <li onClick={() => setCity('Bekescsaba')}>Bekescsaba</li>
                                <li onClick={() => setCity('Debrecen')}>Debrecen</li>
                                <li onClick={() => setCity('Eger')}>Eger</li>
                                <li onClick={() => setCity('Gyor')}>Gyor</li>
                                <li onClick={() => setCity('Kaposvar')}>Kaposvar</li>
                                <li onClick={() => setCity('Kecskemet')}>Kecskemet</li>
                                <li onClick={() => setCity('Miskolc')}>Miskolc</li>
                                <li onClick={() => setCity('Nyiregyhaza')}>Nyiregyhaza</li>
                                <li onClick={() => setCity('Pecs')}>Pecs</li>
                                <li onClick={() => setCity('Salgotarjan')}>Salgotarjan</li>
                                <li onClick={() => setCity('Szeged')}>Szeged</li>
                                <li onClick={() => setCity('Szekszard')}>Szekszard</li>
                                <li onClick={() => setCity('Szekesfehervar')}>Szekesfehervar</li>
                                <li onClick={() => setCity('Szolnok')}>Szolnok</li>
                                <li onClick={() => setCity('Szombathely')}>Szombathely</li>
                                <li onClick={() => setCity('Tatabanya')}>Tatabanya</li>
                                <li onClick={() => setCity('Veszprem')}>Veszprem</li>
                                <li onClick={() => setCity('Zalaegerszeg')}>Zalaegerszeg</li>
                            </ul>
                        </div>
                        <div className="city-list-abroad">
                            <div className="city-list-title">Abroad</div>
                            <ul>
                                <li onClick={() => setCity("London")}>London</li>
                                <li onClick={() => setCity('Berlin')}>Berlin</li>
                                <li onClick={() => setCity('Paris')}>Paris</li>
                                <li onClick={() => setCity('Rome')}>Rome</li>
                                <li onClick={() => setCity('Amsterdam')}>Amsterdam</li>
                                <li onClick={() => setCity('Bratislava')}>Bratislava</li>
                                <li onClick={() => setCity('Wien')}>Wien</li>
                                <li onClick={() => setCity('Madrid')}>Madrid</li>
                                <li onClick={() => setCity('Lisbon')}>Lisbon</li>
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