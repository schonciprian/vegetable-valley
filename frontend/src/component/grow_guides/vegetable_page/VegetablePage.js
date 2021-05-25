import React from 'react';
import {Vegetables} from "../Descriptions";
import {Link, useParams} from "react-router-dom";
import SowingTable from "./sowing_table/SowingTable";
import BasicInformation from "./BasicInformation";
import LongerInformation from "./LongerInformation";


function VegetablePage(props) {
    const urlParams = useParams();
    const vegetableInfo = Vegetables[urlParams.vegetableName];

    return (
        <div className="vegetable-info-container">
            <Link className="back-button" to="/grow-guides">Back to grow guides</Link><br/>
            <div className="vegetable-info">
                <div className="smaller-information">
                    <BasicInformation vegetableInfo={vegetableInfo}/>

                    { vegetableInfo.sow_direct || vegetableInfo.sow_indoors
                        ? <SowingTable vegetableInfo={vegetableInfo}/>
                        :
                        <div className="no-sowing-table">Sowing table for {vegetableInfo.name} is not available!</div> }
                </div>

                { vegetableInfo.basic_information || vegetableInfo.how_to_grow || vegetableInfo.how_to_harvest
                    ? <LongerInformation vegetableInfo={vegetableInfo} />
                    : <React.Fragment/> }
            </div>
        </div>
    );
}

export default VegetablePage;
