import React, {useEffect, useState} from 'react';
import {Image} from 'cloudinary-react';
import '../../stylesheet/basic/basic_main/UserImages.css';
import {deleteRequest, getRequest} from "../additionals/Requests";
import {FaCheckCircle} from "react-icons/fa";
import {GiMagnifyingGlass} from "react-icons/gi";
import FullScreenImage from "./FullScreenImage";
import UploadImageSelection from "./subcomponents/UploadImageSelection";
import ImagePerPage from "./subcomponents/ImagePerPage";
import {FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight} from "react-icons/fi";

function Gallery(props) {
    const [listOfUserImages, setListOfUserImages] = useState([])
    const [fullScreenImageId, setFullScreenImageId] = useState("")
    const [selectedImagesToRemove, setSelectedImagesToRemove] = useState([])
    const [loading, setLoading] = useState(true);
    const [imagePerPage, setImagePerPage] = useState(12)
    const [actualPageNumber, setActualPageNumber] = useState(1)

    console.log(actualPageNumber);

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

                        <div className="select-all" onClick={() => selectAllImages()}>
                            {selectedImagesToRemove.length !== listOfUserImages.length
                                ? "Select all images"
                                : "Unselect all images"}
                        </div>

                        <ImagePerPage imagePerPage={imagePerPage}
                                      setImagePerPage={setImagePerPage}
                                      actualPageNumber={actualPageNumber}
                                      setActualPageNumber={setActualPageNumber}
                                      imageCount={listOfUserImages.length}/>
                    </div>

                </div>

                {loading
                    ? <div className="gallery">
                        <div className="text">Loading...</div>
                    </div>
                    : <div className="gallery">{createImageContainers()}</div>}

                <div className="pagination">
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
                </div>
            </div>
        </div>
    );
}

export default Gallery;
