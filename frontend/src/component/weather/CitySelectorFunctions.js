export function handleFocus(event) {
    event.target.select()
}

export function hideCitySelection() {
    document.getElementById("city-selector-container").style.display = "none";
    document.getElementById("city-selector").style.display = "none";
}