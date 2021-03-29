import React from 'react';

function WeatherIcons(props) {

    const createIcons = (listIfIcons, index) => {
        return listIfIcons.map((icon) => (<img key={index} src={`https://openweathermap.org/img/w/${icon}.png`} alt=""/>))
    }

    return (
        <div className="icons">
            {createIcons(props.weatherIcons)}
        </div>
    );
}

export default WeatherIcons;