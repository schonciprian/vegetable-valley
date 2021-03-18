import React from 'react';

function LongerInformation(props) {
    const vegetableInfo = props.vegetableInfo;

    return (
        <div className="longer-information-container">
            {vegetableInfo.basic_information &&
            <div className="longer-information">
                <span className="longer-information-title">Basic information: </span>
                <span className="longer-information-text">{vegetableInfo.basic_information}</span>
            </div>
            }

            {vegetableInfo.how_to_grow &&
            <div className="longer-information">
                <span className="longer-information-title">How to grow: </span>
                <span className="longer-information-text">{vegetableInfo.how_to_grow}</span>
            </div>
            }

            {vegetableInfo.how_to_harvest &&
            <div className="longer-information">
                <span className="longer-information-title">How to harvest: </span>
                <span className="longer-information-text">{vegetableInfo.how_to_harvest}</span>
            </div>
            }
        </div>
    );
}

export default LongerInformation;