import React, {useContext} from 'react';
import {RiArrowDownSLine} from "react-icons/ri";
import {AiOutlineCaretRight} from "react-icons/ai";
import {GalleryPaginationContext} from "../../contexts/GalleryPaginationContext";

function ImagePerPage(props) {
    const {imagePerPage, setImagePerPage, actualPageNumber, setActualPageNumber} = useContext(GalleryPaginationContext)
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
