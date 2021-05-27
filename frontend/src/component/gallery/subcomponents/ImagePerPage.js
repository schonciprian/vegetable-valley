import React from 'react';
import {RiArrowDownSLine} from "react-icons/ri";
import {AiOutlineCaretRight} from "react-icons/ai";

function ImagePerPage(props) {
    const imagePerPage = props.imagePerPage;
    const setImagePerPage = props.setImagePerPage;
    const actualPageNumber = props.actualPageNumber;
    const setActualPageNumber = props.setActualPageNumber;
    const imageCount = props.imageCount;
    const imagePerPageOptions = [3, 6, 9, 12, 15];

    const refreshPagination = (option) => {
        setImagePerPage(option)
        if (actualPageNumber > imageCount / option) setActualPageNumber(Math.ceil(imageCount / option))
    }

    const createImagePerPageOptions = () => {
        return imagePerPageOptions.map((option, index) => (
            <div key={index} onClick={() => refreshPagination(option)}>
                {imagePerPage === option && <AiOutlineCaretRight className="active"/>}
                {option}
            </div>
        ))
    }

    return (
        <div className="img-per-page-dropdown">
            <div className="img-per-page-dropdown-button"><RiArrowDownSLine/> Image per page</div>
            <div className="img-per-page-dropdown-content">
                {createImagePerPageOptions()}
            </div>
        </div>
    );
}

export default ImagePerPage;
