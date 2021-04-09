export const hungarianCities = ['Budapest', 'Békéscsaba', 'Debrecen', 'Eger', 'Győr', 'Kaposvár', 'Kecskemét',
    'Miskolc', 'Nyíregyháza', 'Pécs', 'Salgótarján', 'Szeged', 'Szekszárd', 'Székesfehérvár',
    'Szolnok', 'Szombathely', 'Tatabánya', 'Veszprém', 'Zalaegerszeg'];
export const foreignCities = ['Amsterdam', 'Berlin', 'Bratislava', 'Copenhagen', 'Lisbon', 'London', 'Madrid', 'Paris', 'Rome', 'Wien']

export function hideCitySelection() {
    document.getElementById("city-selector-container").style.display = "none";
    document.getElementById("city-selector").style.display = "none";
    document.getElementById("city-input").value = "";
}

export function showCitySelection() {
    document.getElementById("city-selector-container").style.display = "block";
    document.getElementById("city-selector").style.display = "block";
}

