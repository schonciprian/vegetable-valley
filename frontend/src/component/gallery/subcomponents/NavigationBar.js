import React, {useContext} from 'react';
import UploadImageSelection from "./UploadImageSelection";
import ImagePerPage from "./gallery_pagination/ImagePerPage";
import {deleteRequest, getRequest} from "../../additionals/Requests";
import {GalleryPaginationContext} from "../contexts/GalleryPaginationContext";

function NavigationBar(props) {
    const {imagePerPage, setImagePerPage, actualPageNumber, setActualPageNumber} = useContext(GalleryPaginationContext)

    const selectedImagesToRemove = props.selectedImagesToRemove
    const setSelectedImagesToRemove = props.setSelectedImagesToRemove
    const listOfUserImages = props.listOfUserImages
    const setListOfUserImages = props.setListOfUserImages
    const setLoading = props.setLoading

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

    return (
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
    );
}

export default NavigationBar;
