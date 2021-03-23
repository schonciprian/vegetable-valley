import React, {useContext, useEffect, useState} from 'react';
import {Vegetables} from './Descriptions';
import {FaHeart, FaSpinner} from "react-icons/fa";
import {GiPin} from "react-icons/gi";
import {heartCard, pinCard, toggleCard} from "./GrowGuideCardActions";
import {Link} from "react-router-dom";
import '../../stylesheet/grow_guide/Grow_Guides_Selection.css';
import '../../stylesheet/grow_guide/Grow_Guides_Card.css';
import '../../stylesheet/grow_guide/VegetableInfo.css';
import {SelectedTypeListContext} from "../../context/SelectedTypeListContext";
import SelectionBox from "./SelectionBox";
import {LoadingContext} from "../../context/LoadingContext";


export default function GrowGuideCard() {

    const [data, setData] = useState([]);
    const [vegetableData, setVegetableData] = useState(Vegetables);
    const [isFetching, setIsFetching] = useState(true);
    const [dataEndIndex, setDataEndIndex] = useState(Math.ceil((window.innerHeight - 355) / 360) * Math.floor(window.innerWidth * 0.8 / 255) - 4);
    const [selectedTypeList, setSelectedTypeList] = useContext(SelectedTypeListContext);
    const [loading, setLoading] = useContext(LoadingContext);

    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom + 50 >= docHeight) {
            setIsFetching(true)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return (() => {
            window.removeEventListener("scroll", handleScroll);
            setSelectedTypeList([]);
        })
    }, [setSelectedTypeList])

    useEffect(() => {
        if (isFetching) {
            setDataEndIndex(dataEndIndex => dataEndIndex + (Math.floor(window.innerWidth * 0.8 / 255)))

            const fetchData = Object.keys(vegetableData).slice(0, dataEndIndex).reduce((result, key) => {
                result[key] = Vegetables[key];
                return result;
            }, {});

            setData(fetchData);
            setIsFetching(false);
        }
    }, [isFetching, dataEndIndex, vegetableData])

    useEffect(() => {
        if (selectedTypeList.length !== 0) {
            setVegetableData(Object.keys(Vegetables).reduce((result, vegetable) => {
                if (Vegetables[vegetable].types.some(type => selectedTypeList.includes(type))) {
                    result[vegetable] = Vegetables[vegetable]
                }
                setIsFetching(true);
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

    }, [selectedTypeList, setLoading])

    return (
        <div className="grow-guides-container">
            <SelectionBox />

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
                                            <span>{Vegetables[veggie].sow_depth ? Vegetables[veggie].sow_depth : "-"}</span>
                                        </p>
                                        <p>
                                            <span>Line spacing:</span>
                                            <span>{Vegetables[veggie].spacing_between_rows ? Vegetables[veggie].spacing_between_rows : "-"}</span>
                                        </p>
                                        <p>
                                            <span>Inline spacing: </span>
                                            <span>{Vegetables[veggie].spacing_along_row ? Vegetables[veggie].spacing_along_row : "-"}</span>
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

