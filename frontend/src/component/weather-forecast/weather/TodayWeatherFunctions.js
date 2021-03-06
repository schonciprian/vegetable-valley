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

export function calculateSunriseSunset(dateTime) {
    return (dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()) +
        ':' +
        (dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes())  +
        ':' +
        (dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds())
}