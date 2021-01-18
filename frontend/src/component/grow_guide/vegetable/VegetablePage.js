import React from 'react';
import {Vegetables} from "../Descriptions";
import {Link} from "react-router-dom";
import harvesticon_greyout from '../../../image/harvesticon-greyout.png';
import harvesticon_selected from '../../../image/harvesticon-selected.png';
import sowicon_greyout from '../../../image/sowicon-greyout.png';
import sowicon_selected from '../../../image/sowicon-selected.png';
import planticon_greyout from '../../../image/planticon-greyout.png';
import planticon_selected from '../../../image/planticon-selected.png';
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
                    <div>{vegetableInfo.name}</div>
                    <br/>

                    <img src={vegetableInfo.pictureURL} alt=""/>
                    <div>Sowing depth: {vegetableInfo.sow_depth}</div>
                    <br/>
                    <div>Line spacing: {vegetableInfo.spacing_between_rows}</div>
                    <br/>
                    <div>Inline spacing: {vegetableInfo.spacing_along_row}</div>
                    <br/>

                    <SowingTableDirect vegetableInfo={vegetableInfo}/>
                    <SowingTableInside vegetableInfo={vegetableInfo}/>

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