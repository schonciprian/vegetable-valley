import {Cloud, CloudOff, CloudRain, CloudSnow, Sun} from "react-feather";

export function getMonth(month) {
    switch(month) {
        case 0:
            return 'Jan';
        case 1:
            return 'Feb';
        case 2:
            return 'Mar';
        case 3:
            return 'Apr';
        case 4:
            return 'May';
        case 5:
            return 'Jun';
        case 6:
            return 'Jul';
        case 7:
            return 'Aug';
        case 8:
            return 'Sep';
        case 9:
            return 'Oct';
        case 10:
            return 'Nov';
        default:
            return 'Dec';
    }
}

export function calculateSunriseSunset(dateTime) {
    return (dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()) +
        ':' +
        (dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes())  +
        ':' +
        (dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds())
}

// Change weatherType to React-feather's equivalent
export function getFeatherName(weatherType) {
    switch(weatherType) {
        case 'Sun':
            return Sun;
        case 'Rain':
            return CloudRain;
        case 'Clear':
            return CloudOff;
        case 'Snow':
            return CloudSnow;
        case 'Clouds':
            return Cloud;
        case 'Drizzle':
            return CloudDrizzle;
        case 'Mist':
            return 'div';   // No mist feather-icon
        default:
            return Sun;
    }
}