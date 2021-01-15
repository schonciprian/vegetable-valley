import React, {useEffect, useState} from 'react';
import {Vegetables} from './Descriptions';
import {FaEyeDropper} from "react-icons/fa";
import {pinCard, toggleCard} from "./GrowGuideCardActions";

export default function GrowGuide() {

    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [dataEndIndex, setDataEndIndex] = useState(Math.ceil((window.innerHeight-155)/360)*Math.floor(window.innerWidth*0.8/255));

    const isScrolling = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        setIsFetching(true)
    }

    useEffect(() => {
        window.addEventListener("scroll", isScrolling);
        const fetchData = Object.keys(Vegetables).slice(0, dataEndIndex).reduce((result, key) => {
            result[key] = Vegetables[key];
            return result;
        }, {});

        if (isFetching) {
            setData(fetchData);
            setIsFetching(false);
            setDataEndIndex(dataEndIndex => dataEndIndex + (Math.floor(window.innerWidth * 0.8 / 255)))
        }
    }, [isFetching, dataEndIndex])

    return (
        <div className="grow-guides-container">

            {Object.keys(data).map((veggie, index) => (
                <div key={index} className="grow-guide-card-outer" onClick={() => toggleCard(index)}>
                    <div id={index} className="grow-guide-card-inner" key={index}>
                        <div className="card-face card-face-front">
                            <div className="vegetable-name">{Vegetables[veggie].name}</div>
                            <img src={Vegetables[veggie].pictureURL} alt=""/>
                        </div>
                        <div className="card-face card-face-back">
                            <div className="card-content">
                                <div className="card-header">
                                    <h2>{Vegetables[veggie].name}</h2>
                                    <img className="pp" src={Vegetables[veggie].pictureURL} alt=""/>
                                </div>
                                <div className="card-body">
                                    <p>Sowing
                                        depth: {Vegetables[veggie].sow_depth ? Vegetables[veggie].sow_depth : 0}</p>
                                    <p>Spacing between
                                        rows: {Vegetables[veggie].spacing_between_rows ? Vegetables[veggie].spacing_between_rows : 0}</p>
                                    <p>Spacing along
                                        rows: {Vegetables[veggie].spacing_along_row ? Vegetables[veggie].spacing_along_row : 0}</p>
                                    <div className="buttons" onClick={(event) => event.stopPropagation()}>

                                        <div className="more-info" onClick={(event) => {
                                            console.log("More info")
                                        }}>
                                            More info
                                        </div>

                                        <div id={`pin-icon-${index}`}
                                             className="pin-icon"
                                             onClick={(event) => pinCard(event, index)}>
                                            <FaEyeDropper/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}

