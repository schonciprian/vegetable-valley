import React, {useEffect, useState} from 'react';
import {Vegetables} from './Descriptions';
import {FaEyeDropper} from "react-icons/fa";
import {pinCard, toggleCard} from "./GrowGuideCardActions";

export default function GrowGuide() {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);

    function isScrolling() {
        if (window.innerHeight + document.documentElement.scrollTop + 10 <= document.documentElement.offsetHeight) {
            return;
        }
        setIsFetching(true)
    }

    useEffect(() => {
        setData(getData);

        window.addEventListener("scroll", isScrolling);
        return () => window.removeEventListener("scroll", isScrolling);
    }, [])

    useEffect(() => {
        if (isFetching) {
            moreData()
        }
    }, [isFetching]);

    const getData = Object.keys(Vegetables).slice(0, page*6).reduce((result, key) => {
        result[key] = Vegetables[key];
        return result;
    }, {});

    const moreData = () => {
        setData(getData);
        setIsFetching(false)
        setPage(page+1)
    }


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
                                    <p>Sowing depth: {Vegetables[veggie].sow_depth ? Vegetables[veggie].sow_depth : 0}</p>
                                    <p>Spacing between rows: {Vegetables[veggie].spacing_between_rows ? Vegetables[veggie].spacing_between_rows : 0}</p>
                                    <p>Spacing along rows: {Vegetables[veggie].spacing_along_row ? Vegetables[veggie].spacing_along_row : 0}</p>
                                    <div className="buttons" onClick={(event) => event.stopPropagation()}>

                                        <div className="more-info" onClick={(event) => {
                                            console.log("More info")}}>
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

