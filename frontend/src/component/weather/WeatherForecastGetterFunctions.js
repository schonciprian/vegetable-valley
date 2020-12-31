export function getDayTemperatureDailyForecast(dailyForecast, indexOfDailyForecast) {
    return (dailyForecast.length !== 0) ?
        (dailyForecast[indexOfDailyForecast].dayTemp).toFixed(1) :
        "";
}

export function getNightTemperatureDailyForecast(dailyForecast, indexOfDailyForecast) {
    return (dailyForecast.length !== 0) ?
        (dailyForecast[indexOfDailyForecast].nightTemp).toFixed(1) :
        "";
}

export function getPrecipitationDailyForecast(dailyForecast, indexOfDailyForecast) {
    return (dailyForecast.length !== 0) ?
        dailyForecast[indexOfDailyForecast].precipitation :
        "";
}

export function getRainDailyForecast(dailyForecast, indexOfDailyForecast) {
    return (dailyForecast.length !== 0) ?
        dailyForecast[indexOfDailyForecast].rain :
        "";
}

export function getSnowDailyForecast(dailyForecast, indexOfDailyForecast) {
    return (dailyForecast.length !== 0) ?
        dailyForecast[indexOfDailyForecast].snow :
        "";
}

export function getWindDailyForecast(dailyForecast, indexOfDailyForecast) {
    return (dailyForecast.length !== 0) ?
        dailyForecast[indexOfDailyForecast].wind :
        "";
}

export function getHumidityDailyForecast(dailyForecast, indexOfDailyForecast) {
    return (dailyForecast.length !== 0) ?
        dailyForecast[indexOfDailyForecast].humidity :
        "";
}

export function getDateOfDailyForecast(dailyForecast, indexOfDailyForecast) {
    return (dailyForecast.length !== 0) ?
        dailyForecast[indexOfDailyForecast].month + ". " + dailyForecast[indexOfDailyForecast].date + ". ":
        "";
}

export function getDayNameOfDailyForecast(dailyForecast, indexOfDailyForecast) {
    return (dailyForecast.length !== 0) ?
        getDayName(dailyForecast[indexOfDailyForecast].day):
        "";
}

export function getDayName(day) {
    switch(day) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return 'Sunday';
    }
}
