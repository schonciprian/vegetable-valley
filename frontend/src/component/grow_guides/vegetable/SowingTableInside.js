import React from 'react';
import sowicon_selected from "../../../image/gardening_icons/sowicon-selected.png";
import sowicon_greyout from "../../../image/gardening_icons/sowicon-greyout.png";
import planticon_selected from "../../../image/gardening_icons/planticon-selected.png";
import planticon_greyout from "../../../image/gardening_icons/planticon-greyout.png";
import harvesticon_selected from "../../../image/gardening_icons/harvesticon-selected.png";
import harvesticon_greyout from "../../../image/gardening_icons/harvesticon-greyout.png";

function SowingTableInside(props) {
    const vegetableInfo = props.vegetableInfo;
    const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

    return (
        <div className="sowing-table">
            <table>
                <tbody>
                <tr>
                    <th/>
                    {months.map(((month, index) => (
                        <th key={index}>{month}</th>
                    )))}
                </tr>
                <tr>
                    <th>Sow indoors</th>
                    {vegetableInfo.sow_indoors.sow_indoors.map(((value, index) => (
                        <th key={index}>{value === 1 ? <img src={sowicon_selected} alt=""/> :
                            <img src={sowicon_greyout} alt=""/>}</th>
                    )))}
                </tr>
                <tr>
                    <th>Plant out</th>
                    {vegetableInfo.sow_indoors.plant_out.map(((value, index) => (
                        <th key={index}>{value === 1 ? <img src={planticon_selected} alt=""/> :
                            <img src={planticon_greyout} alt=""/>}</th>
                    )))}
                </tr>
                <tr>
                    <th>Harvest</th>
                    {vegetableInfo.sow_indoors.harvest.map(((value, index) => (
                        <th key={index}>{value === 1 ? <img src={harvesticon_selected} alt=""/> :
                            <img src={harvesticon_greyout} alt=""/>}</th>
                    )))}
                </tr>
                </tbody>
            </table>
        </div>    );
}

export default SowingTableInside;