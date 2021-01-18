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
                        <div>{vegetableInfo.name}</div>
                        <img src={vegetableInfo.pictureURL} alt=""/>
                        <div>
                            <span>Sowing depth: </span>
                            <span>{vegetableInfo.sow_depth}</span>
                        </div>
                        <div>
                            <span>Line spacing: </span>
                            <span>{vegetableInfo.spacing_between_rows}</span>
                        </div>
                        <div>
                            <span>Inline spacing: </span>
                            <span>{vegetableInfo.spacing_along_row}</span>
                        </div>
                    </div>

                    {vegetableInfo.sow_direct || vegetableInfo.sow_indoors ?
                        <div className="sowing-table-container">
                            {vegetableInfo.sow_direct ? <SowingTableDirect vegetableInfo={vegetableInfo}/> :
                                <React.Fragment/>}
                            {vegetableInfo.sow_indoors ? <SowingTableInside vegetableInfo={vegetableInfo}/> :
                                <React.Fragment/>}
                        </div> :
                    <React.Fragment/>}
                </div>
                <div className="longer-information">
                    <div>Basic information: <br/><br/>{vegetableInfo.basic_information}</div>
                    <br/>
                    <div>How to grow: <br/><br/>{vegetableInfo.how_to_grow}</div>
                    <br/>
                    <div>How to harvest: <br/><br/>{vegetableInfo.how_to_harvest}</div>
                    <br/>
                </div>

            </div>


        </div>
    );
}

export default VegetablePage;