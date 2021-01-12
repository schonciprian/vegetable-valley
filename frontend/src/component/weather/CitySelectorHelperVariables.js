export const hungarianCities = ['Budapest', 'Bekescsaba', 'Debrecen', 'Eger', 'Gyor', 'Kaposvar', 'Kecskemet',
    'Miskolc', 'Nyiregyhaza', 'Pecs', 'Salgotarjan', 'Szeged', 'Szekszard', 'Szekesfehervar',
    'Szolnok', 'Szombathely', 'Tatabanya', 'Veszprem', 'Zalaegerszeg'];
export const foreignCities = ['Amsterdam', 'Berlin', 'Bratislava', 'Copenhagen', 'Lisbon', 'London', 'Madrid', 'Paris', 'Rome', 'Wien']

export function hideCitySelection() {
    document.getElementById("city-selector-container").style.display = "none";
    document.getElementById("city-selector").style.display = "none";
}

