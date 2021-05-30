import React, {useContext} from 'react';
import {FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight} from "react-icons/fi";
import {GalleryPaginationContext} from "../../contexts/GalleryPaginationContext";

function Pagination(props) {
    const {imagePerPage, actualPageNumber, setActualPageNumber} = useContext(GalleryPaginationContext)
    const listOfUserImagesLength = props.listOfUserImagesLength;

    if (listOfUserImagesLength === 0) return <React.Fragment/>

    return (
        <div className="gallery-pagination">
            <FiChevronsLeft className={`pagination-icon ${actualPageNumber > 2 ? "" : "hidden"}`}
                            onClick={() => setActualPageNumber(1)}/>

            <FiChevronLeft className={`pagination-icon ${actualPageNumber > 1 ? "" : "hidden"}`}
                           onClick={() => actualPageNumber > 1
                               ? setActualPageNumber(actualPageNumber - 1)
                               : setActualPageNumber(actualPageNumber)}/>

            <div className="actual-page">{actualPageNumber}</div>

            <FiChevronRight
                className={`pagination-icon ${actualPageNumber < listOfUserImagesLength / imagePerPage ? "" : "hidden"}`}
                onClick={() => actualPageNumber < Math.ceil(listOfUserImagesLength / imagePerPage)
                    ? setActualPageNumber(actualPageNumber + 1)
                    : setActualPageNumber(actualPageNumber)}/>

            <FiChevronsRight
                className={`pagination-icon ${actualPageNumber < listOfUserImagesLength / imagePerPage - 1 ? "" : "hidden"}`}
                onClick={() => setActualPageNumber(Math.ceil(listOfUserImagesLength / imagePerPage))}/>
        </div>
    );
}

export default Pagination;
