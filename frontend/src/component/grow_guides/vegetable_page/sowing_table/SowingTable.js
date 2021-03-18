import React from 'react';
import SowingTableDirect from "./SowingTableDirect";
import SowingTableInside from "./SowingTableInside";

function SowingTable(props) {
    return (
        <div className="sowing-table-container">
            <div className="sowing-table-title">
                Planting guidelines for <span>{props.vegetableInfo.name}</span> by month to month.
            </div>
            {props.vegetableInfo.sow_direct
                ? <SowingTableDirect vegetableInfo={props.vegetableInfo}/>
                : <React.Fragment/>}
            {props.vegetableInfo.sow_indoors
                ? <SowingTableInside vegetableInfo={props.vegetableInfo}/>
                : <React.Fragment/>}
        </div>
    );
}

export default SowingTable;