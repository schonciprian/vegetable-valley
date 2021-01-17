import React from 'react';
import {Vegetables} from "./Descriptions";
import {Link} from "react-router-dom";

function VegetablePage(props) {
    const vegetableName = props.match.params.vegetableName;
    const vegetableInfo = Vegetables[vegetableName];

    return (
        <div className="vegetable-info-container">
            <Link className="back-button" to="/grow-guides">Back to grow guides</Link><br/>
            <div className="vegetable-info">
                <div className="smaller-information">
                    <div>{vegetableInfo.name}</div><br/>

                    <img src={vegetableInfo.pictureURL} alt=""/>
                    <div>{vegetableInfo.sow_depth}</div><br/>
                    <div>{vegetableInfo.spacing_between_rows}</div><br/>
                    <div>{vegetableInfo.spacing_along_row}</div><br/>
                </div>
                <div className="longer-information">
                    <div>Basic information: <br/><br/>{vegetableInfo.basic_information}</div><br/>
                    <div>How to grow: <br/><br/>{vegetableInfo.how_to_grow}</div><br/>
                    <div>How to harvest: <br/><br/>{vegetableInfo.how_to_harvest}</div><br/>
                </div>

            </div>


        </div>
    );
}

export default VegetablePage;