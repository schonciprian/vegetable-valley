import React, {useContext} from 'react';
import {SelectedTypeListContext} from "../../context/SelectedTypeListContext";
import {BiSelectMultiple} from "react-icons/bi";
import {
    GiAubergine,
    GiBananaBunch,
    GiBroccoli,
    GiCarrot,
    GiGarlic,
    GiHerbsBundle,
    GiPeas, GiPumpkin, GiThreeLeaves,
    GiTomato
} from "react-icons/gi";
import {LoadingContext} from "../../context/LoadingContext";

function SelectionBox() {
    const [selectedTypeList, setSelectedTypeList] = useContext(SelectedTypeListContext);
    const [, setLoading] = useContext(LoadingContext);

    const selectionTypes = {
        'All': {name: 'All plants', icon: BiSelectMultiple, selected: selectedTypeList.length === 0,},
        'Favorite': {name: 'Favorites', icon: GiBananaBunch,},
        'Fruit': {name: 'Fruits', icon: GiBananaBunch,},
        'Vegetable': {name: 'Vegetables', icon: GiAubergine,},
        'Root': {name: 'Root veggies', icon: GiCarrot,},
        'Herb': {name: 'Herbs', icon: GiHerbsBundle,},
        'Onion': {name: 'Onions', icon: GiGarlic,},
        'Brassica': {name: 'Brassicas', icon: GiBroccoli,},
        'Nightshade': {name: 'Nightshades', icon: GiTomato,},
        'Fabales': {name: 'Fabales', icon: GiPeas,},
        'Cucurbita': {name: 'Cucurbitas', icon: GiPumpkin,},
        'Lactuca': {name: 'Lactucas', icon: GiThreeLeaves,},
    }

    const setSelectedType = (event) => {
        setLoading(true);
        const isFlippedCards = Array.prototype.slice.call(document.querySelectorAll('.is-flipped'));
        isFlippedCards.forEach((isFlippedCard) => {
            if (!isFlippedCard.classList.contains('pin')) {
                isFlippedCard.classList.remove('is-flipped');
            }
        })

        if (event.target.classList.contains('active-selection')) {
            setSelectedTypeList(selectedTypeList => selectedTypeList.filter(item => item !== event.target.id))
        } else {
            setSelectedTypeList([...selectedTypeList, event.target.id])
        }

        // Clicking on "All plants" after more types are selected, only "All" will remain active
        if (event.target.id === 'All') {
            document.querySelectorAll('.active-selection')
                .forEach(element => element.classList
                    .remove('active-selection'))
            setSelectedTypeList([])
        }

        event.target.classList.toggle('active-selection')
    }

    return (
        <div className="plant-type-selection-container">
            <h2>Selection Box</h2>
            <p>The result will be always the union not the intersection of selected types!</p>
            <ul className="plant-types">
                {Object.keys(selectionTypes).map((selectionType, index) => {
                    const TagName = selectionTypes[selectionType].icon;

                    return (
                        <li key={index}
                            id={Object.keys(selectionTypes)[index]}
                            className={selectionTypes[selectionType].selected
                                ? 'active-selection'
                                : undefined}
                            onClick={(event) => setSelectedType(event)}>
                            <TagName className="type-icon" onClick={event => event.stopPropagation()}/>
                            <span
                                onClick={event => event.stopPropagation()}>{selectionTypes[selectionType].name}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default SelectionBox;