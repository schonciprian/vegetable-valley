import React, {useEffect, useState} from 'react';
import {Vegetables} from './Descriptions';
import {FaHeart, FaSpinner} from "react-icons/fa";
import {GiPin} from "react-icons/gi";
import {heartCard, pinCard, toggleCard} from "./GrowGuideCardActions";
import {Link} from "react-router-dom";
import {
    GiBananaBunch,
    GiTomato,
    GiCarrot,
    GiHerbsBundle,
    GiGarlic,
    GiBroccoli,
    GiAubergine,
    GiPeas,
    GiPumpkin,
    GiThreeLeaves
} from "react-icons/gi";
import {BiSelectMultiple} from "react-icons/bi";
import '../../stylesheet/grow_guide/Grow_Guides_Selection.css';
import '../../stylesheet/grow_guide/Grow_Guides_Card.css';
import '../../stylesheet/grow_guide/VegetableInfo.css';


export default function GrowGuideCard() {

    const [data, setData] = useState([]);
    const [vegetableData, setVegetableData] = useState(Vegetables);
    const [isFetching, setIsFetching] = useState(true);
    const [dataEndIndex, setDataEndIndex] = useState(Math.ceil((window.innerHeight - 355) / 360) * Math.floor(window.innerWidth * 0.8 / 255)-4);
    const [selectedTypeCount, setSelectedTypeCount] = useState(0);
    const [selectedTypeList, setSelectedTypeList] = useState([]);
    const [loading, setLoading] = useState(false);

    const isScrolling = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        setIsFetching(true)
    }

    useEffect(() => {
        window.addEventListener("scroll", isScrolling);
        const fetchData = Object.keys(vegetableData).slice(0, dataEndIndex).reduce((result, key) => {
            result[key] = Vegetables[key];
            return result;
        }, {});

        if (isFetching) {
            setData(fetchData);
            setIsFetching(false);
            setDataEndIndex(dataEndIndex => dataEndIndex + (Math.floor(window.innerWidth * 0.8 / 255)))
        }
    }, [isFetching, dataEndIndex, vegetableData])

    useEffect(() => {
        if (selectedTypeList.length !== 0) {
            setVegetableData(Object.keys(Vegetables).reduce((result, vegetable) => {
                if (Vegetables[vegetable].types) {
                    Vegetables[vegetable].types.forEach(type => {
                            if (selectedTypeList.includes(type)) {
                                result[vegetable] = Vegetables[vegetable];
                            }
                        }
                    )
                }
                setIsFetching(true);
                // setDataEndIndex(Math.ceil((window.innerHeight - 155) / 360) * Math.floor(window.innerWidth * 0.8 / 255));
                return result;
            }, {}))
        } else {
            setVegetableData(Vegetables);
            setIsFetching(true);
        }
        setDataEndIndex(Math.ceil((window.innerHeight - 355) / 360) * Math.floor(window.innerWidth * 0.8 / 255));

        setTimeout(() => {
            setLoading(false)
        }, 1000);

    }, [selectedTypeList])


    const setSelectedType = (event) => {
        setLoading(true);
        const isFlippedCards = Array.prototype.slice.call(document.querySelectorAll('.is-flipped'));
        isFlippedCards.forEach((isFlippedCard) => {
            if (!isFlippedCard.classList.contains('pin')) {
                isFlippedCard.classList.remove('is-flipped');
            }
        })

        if (event.target.classList.contains('active-selection')) {
            setSelectedTypeCount(selectedTypeCount - 1)
            setSelectedTypeList(selectedTypeList => selectedTypeList.filter(item => item !== event.target.id))
        } else {
            setSelectedTypeCount(selectedTypeCount + 1)
            setSelectedTypeList([...selectedTypeList, event.target.id])
        }

        // Clicking on "All plants" after more types are selected, only "All" will remain active
        if (event.target.id === 'All') {
            document.querySelectorAll('.active-selection')
                .forEach(element => element.classList
                    .remove('active-selection'))
            setSelectedTypeList([])
            setSelectedTypeCount(0)
        }

        event.target.classList.toggle('active-selection')
    }

    const selectionTypes = {
        'All': {name: 'All plants', icon: BiSelectMultiple, selected: selectedTypeCount === 0,},
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

    return (
        <div className="grow-guides-container">
            <div className="plant-type-selection-container">
                <h2>Selection Box</h2>
                <ul className="plant-types">
                    {Object.keys(selectionTypes).map((selectionType, index) => {
                        const TagName = selectionTypes[selectionType].icon;

                        return (
                            <li key={index}
                                id={Object.keys(selectionTypes)[index]}
                                className={selectionTypes[selectionType].selected
                                    ? 'active-selection'
                                    : ""}
                                onClick={(event) => setSelectedType(event)}>
                                <TagName className="type-icon" onClick={event => event.stopPropagation()}/>
                                <span
                                    onClick={event => event.stopPropagation()}>{selectionTypes[selectionType].name}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            {loading ? <FaSpinner className="type-loading-spinner"/> : <React.Fragment/>}
            <div className={`grow-guides-card ${loading ? "hidden" : ""}`}>
                {Object.keys(data).length === 0 ?
                    <div style={{color: 'darkorange', fontSize: '30px', marginTop: "20px"}}>No result</div> : ""}
                {Object.keys(data).map((veggie, index) => (
                    <div key={index} className="grow-guide-card-outer" onClick={() => toggleCard(index)}>
                        <div id={index}
                             className={`grow-guide-card-inner ${Vegetables[veggie].is_pinned ? "is-flipped pin" : ""}`}
                             key={index}>
                            <div className="card-face card-face-front">
                                <div className="vegetable-name">{Vegetables[veggie].name}</div>
                                <img src={Vegetables[veggie].pictureURL} alt=""/>
                            </div>
                            <div className="card-face card-face-back">
                                <div className="card-content">
                                    <div id={`heart-icon-${index}`}
                                         className="icon heart-icon"
                                         onClick={(event) => heartCard(event, index)}>
                                        <FaHeart/>
                                    </div>
                                    <div id={`pin-icon-${index}`}
                                         className={`icon pin-icon ${Vegetables[veggie].is_pinned ? "active" : ""}`}
                                         onClick={(event) => pinCard(event, index, Vegetables[veggie].id)}>
                                        <GiPin style={{width: "20px", height: "20px"}}/>
                                    </div>
                                    <div className="card-header">
                                        <h2>{Vegetables[veggie].name}</h2>
                                        <img className="vegetable-picture" src={Vegetables[veggie].pictureURL} alt=""/>
                                    </div>
                                    <div className="card-body">
                                        <p>
                                            <span>Sowing depth: </span>
                                            <span>{Vegetables[veggie].sow_depth ? Vegetables[veggie].sow_depth : 0}</span>
                                        </p>
                                        <p>
                                            <span>Line spacing:</span>
                                            <span>{Vegetables[veggie].spacing_between_rows ? Vegetables[veggie].spacing_between_rows : 0}</span>
                                        </p>
                                        <p>
                                            <span>Inline spacing: </span>
                                            <span>{Vegetables[veggie].spacing_along_row ? Vegetables[veggie].spacing_along_row : 0}</span>
                                        </p>
                                        <div className="buttons" onClick={(event) => event.stopPropagation()}>
                                            <Link className="more-info" to={`/grow-guides/${Vegetables[veggie].id}`}>More
                                                info</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

