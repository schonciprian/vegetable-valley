import React from 'react';
import {Vegetables} from "../Descriptions";
import {Link} from "react-router-dom";
import SowingTableDirect from "./SowingTableDirect";
import SowingTableInside from "./SowingTableInside";


function VegetablePage(props) {
    const vegetableName = props.match.params.vegetableName;
    const vegetableInfo = Vegetables[vegetableName];

    return (
        <div className="vegetable-info-container">
            <Link className="back-button" to="/grow-guides">Back to grow guides</Link><br/>
            <div className="vegetable-info">
                <div className="smaller-information">
                    <div className="basic-information">
                        <div className="vegetable-name">{vegetableInfo.name}</div>
                        <img src={vegetableInfo.pictureURL} alt=""/>
                        <div className="vegetable-small-info">
                            <span>Sowing depth: </span>
                            <span>{vegetableInfo.sow_depth}</span>
                        </div>
                        <div className="vegetable-small-info">
                            <span>Line spacing: </span>
                            <span>{vegetableInfo.spacing_between_rows}</span>
                        </div>
                        <div className="vegetable-small-info">
                            <span>Inline spacing: </span>
                            <span>{vegetableInfo.spacing_along_row}</span>
                        </div>
                    </div>

                    {vegetableInfo.sow_direct || vegetableInfo.sow_indoors
                        ? <div className="sowing-table-container">
                            <div className="sowing-table-title">
                                Planting guidelines for <span>{vegetableInfo.name}</span> by month to month.
                            </div>
                            {vegetableInfo.sow_direct ? <SowingTableDirect vegetableInfo={vegetableInfo}/> :
                                <React.Fragment/>}
                            {vegetableInfo.sow_indoors ? <SowingTableInside vegetableInfo={vegetableInfo}/> :
                                <React.Fragment/>}
                        </div>
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