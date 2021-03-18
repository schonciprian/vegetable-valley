import React from 'react';

function BasicInformation(props) {
    const vegetableInfo = props.vegetableInfo;

    return (
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
    );
}

export default BasicInformation;