import React from 'react';
import {Vegetables} from "../Descriptions";
import {Link} from "react-router-dom";
import SowingTable from "./sowing_table/SowingTable";
import BasicInformation from "./BasicInformation";


function VegetablePage(props) {
    const vegetableName = props.match.params.vegetableName;
    const vegetableInfo = Vegetables[vegetableName];

    return (
        <div className="vegetable-info-container">
            <Link className="back-button" to="/grow-guides">Back to grow guides</Link><br/>
            <div className="vegetable-info">
                <div className="smaller-information">
                    <BasicInformation vegetableInfo={vegetableInfo} />

                    {vegetableInfo.sow_direct || vegetableInfo.sow_indoors
                        ? <SowingTable vegetableInfo={vegetableInfo}/>
                        : <div className="no-sowing-table">Sowing table for {vegetableInfo.name} is not available!</div>}
                </div>

                <div className="longer-information-container">
                    <div className="longer-information">
                        <span className="longer-information-title">Basic information: </span>
                        <span className="longer-information-text">{vegetableInfo.basic_information}</span>
                    </div>
                    <div className="longer-information">
                        <span className="longer-information-title">How to grow: </span>
                        <span className="longer-information-text">{vegetableInfo.how_to_grow}</span>
                    </div>
                    <div className="longer-information">
                        <span className="longer-information-title">How to harvest: </span>
                        <span className="longer-information-text">{vegetableInfo.how_to_harvest}</span>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default VegetablePage;