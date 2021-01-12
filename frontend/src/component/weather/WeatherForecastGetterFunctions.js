import {getMonth} from "./TodayWeatherFunctions";

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
        getMonth(dailyForecast[indexOfDailyForecast].month-1) + ". " + dailyForecast[indexOfDailyForecast].date + ". ":
        "";
}

export function getDayNameOfDailyForecast(dailyForecast, indexOfDailyForecast) {
    return (dailyForecast.length !== 0) ?
        getDayName(dailyForecast[indexOfDailyForecast].day):
        "";
}
