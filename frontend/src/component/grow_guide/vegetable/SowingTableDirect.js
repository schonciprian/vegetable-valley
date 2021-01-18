import React from 'react';
import sowicon_selected from "../../../image/sowicon-selected.png";
import sowicon_greyout from "../../../image/sowicon-greyout.png";
import harvesticon_selected from "../../../image/harvesticon-selected.png";
import harvesticon_greyout from "../../../image/harvesticon-greyout.png";

function SowingTableDirect(props) {
    const vegetableInfo = props.vegetableInfo;
    const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

    return (
        <div className="sowing-table">
            <table>
                <tbody>
                <tr>
                    <th/>
                    {months.map((month => (
                        <th>{month}</th>
                    )))}
                </tr>
                <tr>
                    <th>Sow direct</th>
                    {vegetableInfo.sow_direct.sow_direct.map((value => (
                        <th>{value === 1 ? <img src={sowicon_selected} alt=""/> :
                            <img src={sowicon_greyout} alt=""/>}</th>
                    )))}
                </tr>
                <tr>
                    <th>Harvest</th>
                    {vegetableInfo.sow_direct.harvest.map((value => (
                        <th>{value === 1 ? <img src={harvesticon_selected} alt=""/> :
                            <img src={harvesticon_greyout} alt=""/>}</th>
                    )))}
                </tr>
                </tbody>
            </table>
        </div>    );
}

export default SowingTableDirect;