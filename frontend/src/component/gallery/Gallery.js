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

    useEffect(() => {
        getRequest('/api/get-images', {}, (response) => {
            setLoading(false)
            setListOfUserImages(response.data)
        })
    }, [loading])

    const removeImage = () => {
        deleteRequest('/api/remove-image', {image_ids: selectedImagesToRemove}, () => {
                getRequest('/api/get-images', {},
                    (response) => setListOfUserImages(response.data))
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
        if (listOfUserImages.length === 0) return "No images available";

        return listOfUserImages.slice(0, imagePerPage).map((image, index) => (
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

                        <ImagePerPage imagePerPage={imagePerPage} setImagePerPage={setImagePerPage}/>
                    </div>

                </div>

                {loading
                    ? <div className="gallery">Loading</div>
                    : <div className="gallery">{createImageContainers()}</div>}

                <div className="pagination">
                        <FiChevronsLeft className="pagination-icon"/>
                        <FiChevronLeft className="pagination-icon"/>
                        <div className="actual-page">1</div>
                        <FiChevronRight className="pagination-icon"/>
                        <FiChevronsRight className="pagination-icon"/>
                </div>
            </div>
        </div>
    );
}

export default Gallery;
