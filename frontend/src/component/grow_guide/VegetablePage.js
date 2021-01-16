import React from 'react';
import {Vegetables} from "./Descriptions";
import {Link} from "react-router-dom";

function VegetablePage(props) {
    const vegetableName = props.match.params.vegetableName;
    const vegetableInfo = Vegetables[vegetableName];

    return (
        <div style={{color: "#eee"}}>
            <Link style={{color: "#eee"}} to="/grow-guides">Back to grow guides</Link><br/><br/>
            <div>{vegetableInfo.name}</div><br/>
            <div>{vegetableInfo.basic_information}</div><br/>
            <div>{vegetableInfo.how_to_grow}</div><br/>
            <div>{vegetableInfo.how_to_harvest}</div><br/>
            <img src={vegetableInfo.pictureURL} alt=""/>
        </div>
    );
}

export default VegetablePage;