import React, {useEffect, useRef, useState} from 'react';
import {Image} from 'cloudinary-react';
import '../../stylesheet/basic/basic_main/UserImages.css';
import {deleteRequest, getRequest} from "../additionals/Requests";
import {FaCheckCircle} from "react-icons/fa";
import {GiMagnifyingGlass} from "react-icons/gi";
import FullScreenImage from "./FullScreenImage";
import UploadImageSelection from "./subcomponents/UploadImageSelection";
import ImagePerPage from "./subcomponents/ImagePerPage";
import {FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight} from "react-icons/fi";
import {CirclePicker} from "react-color";
import {RiArrowDownSLine} from "react-icons/ri";


function Gallery(props) {
    const [listOfUserImages, setListOfUserImages] = useState([])
    const [fullScreenImageId, setFullScreenImageId] = useState("")
    const [selectedImagesToRemove, setSelectedImagesToRemove] = useState([])
    const [loading, setLoading] = useState(true);
    const [imagePerPage, setImagePerPage] = useState(12)
    const [actualPageNumber, setActualPageNumber] = useState(1)

    const newTagNameRef = useRef(null)
    const [showColorDropdown, setShowColorDropdown] = useState(false)
    const [color, setColor] = useState("#f44336")
    const availableColors = [
        "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688",
        "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]

    useEffect(() => {
        getRequest('/api/get-images', {}, (response) => {
            setLoading(false)
            setListOfUserImages(response.data)
        })
    }, [loading])

    const removeImage = () => {
        deleteRequest('/api/remove-image', {image_ids: selectedImagesToRemove}, () => {
                getRequest('/api/get-images', {},
                    (response) => {
                        setSelectedImagesToRemove([])
                        setListOfUserImages(response.data)
                        if (actualPageNumber > response.data.length / imagePerPage) setActualPageNumber(Math.ceil(response.data.length / imagePerPage))
                    })
            },
            (error) => console.log(error))
    }

    const toggleImageSelection = (image) => {
        if (selectedImagesToRemove.includes(image.image_id)) {
            setSelectedImagesToRemove(selectedImagesToRemove.filter(item => item !== image.image_id))
        } else {
            setSelectedImagesToRemove([...selectedImagesToRemove, image.image_id]);
        }
    }

    const createImageContainers = () => {
        if (listOfUserImages.length === 0) return <div className="text">No images available</div>;

        return listOfUserImages.slice(imagePerPage * actualPageNumber - imagePerPage, imagePerPage * actualPageNumber).map((image, index) => (
            <div key={index} className="image-container" data-imageid={image.image_id}
                 onClick={() => toggleImageSelection(image)}>
                <Image cloudName="dfvo9ybxe" publicId={image.image_id}/>
                <FaCheckCircle
                    className={`remove-container ${selectedImagesToRemove.includes(image.image_id) ? " active" : ""}`}/>
                <GiMagnifyingGlass className="magnifying-glass" onClick={(event) => {
                    event.stopPropagation()
                    setFullScreenImageId(image.image_id)
                }}/>
            </div>
        ))
    }

    const selectAllImages = () => {
        if (selectedImagesToRemove.length === listOfUserImages.length) {
            setSelectedImagesToRemove([])
            return;
        }

        listOfUserImages.forEach(image => {
            if (!selectedImagesToRemove.includes(image.image_id)) {
                setSelectedImagesToRemove(prevData => ([...prevData, image.image_id]))
            }
        })
    }

    return (
        <div>
            {fullScreenImageId.length !== 0 &&
            <FullScreenImage imgId={fullScreenImageId} setFullScreenImageId={setFullScreenImageId}/>}

            <div className="container">
                <h1 className="title">Image gallery</h1>
                <div className="navigation-bar">
                    <UploadImageSelection setLoading={setLoading}/>

                    <div className="extra-options">
                        {selectedImagesToRemove.length !== 0 &&
                        <div className="remove-button" onClick={() => removeImage()}>Remove images</div>}

                        {listOfUserImages.length !== 0 &&
                        <div className="select-all" onClick={() => selectAllImages()}>
                            {selectedImagesToRemove.length !== listOfUserImages.length
                                ? "Select all images"
                                : "Unselect all images"}
                        </div>}

                        {listOfUserImages.length !== 0 && <ImagePerPage imagePerPage={imagePerPage}
                                                                        setImagePerPage={setImagePerPage}
                                                                        actualPageNumber={actualPageNumber}
                                                                        setActualPageNumber={setActualPageNumber}
                                                                        imageCount={listOfUserImages.length}/>}
                    </div>
                </div>

                <div className="tag-bar">
                    <div className="add-new-tag">
                        <input type="text" ref={newTagNameRef}/>
                        <div className="color-dropdown">
                            <div className="color-dropdown-button"
                                 style={{backgroundColor: color}}
                                 onClick={() => setShowColorDropdown(!showColorDropdown)}>Change color</div>
                            <CirclePicker className="color-dropdown-content"
                                          circleSpacing="0"
                                          color={color}
                                          colors={availableColors}
                                          onChangeComplete={(color) => setColor(color.hex)}/>
                        </div>

                        <div onClick={() => console.log(newTagNameRef.current.value)}>Add</div>
                    </div>
                    <div className="existing-tag">
                        <div style={{color: color}}>First tag</div>
                        <div style={{color: "red"}}>Second tag</div>
                    </div>
                </div>

                {loading
                    ? <div className="gallery">
                        <div className="text">Loading...</div>
                    </div>
                    : <div className="gallery">{createImageContainers()}</div>}

                {listOfUserImages.length !== 0 && <div className="gallery-pagination">
                    <FiChevronsLeft className={`pagination-icon ${actualPageNumber > 2 ? "" : "hidden"}`}
                                    onClick={() => setActualPageNumber(1)}/>

                    <FiChevronLeft className={`pagination-icon ${actualPageNumber > 1 ? "" : "hidden"}`}
                                   onClick={() => actualPageNumber > 1
                                       ? setActualPageNumber(actualPageNumber - 1)
                                       : setActualPageNumber(actualPageNumber)}/>

                    <div className="actual-page">{actualPageNumber}</div>

                    <FiChevronRight
                        className={`pagination-icon ${actualPageNumber < listOfUserImages.length / imagePerPage ? "" : "hidden"}`}
                        onClick={() => actualPageNumber < Math.ceil(listOfUserImages.length / imagePerPage)
                            ? setActualPageNumber(actualPageNumber + 1)
                            : setActualPageNumber(actualPageNumber)}/>

                    <FiChevronsRight
                        className={`pagination-icon ${actualPageNumber < listOfUserImages.length / imagePerPage - 1 ? "" : "hidden"}`}
                        onClick={() => setActualPageNumber(Math.ceil(listOfUserImages.length / imagePerPage))}/>
                </div>}
            </div>
        </div>
    );
}

export default Gallery;
