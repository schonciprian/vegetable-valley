import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Image} from 'cloudinary-react';
import '../../stylesheet/basic/basic_main/UserImages.css';
import {FaCloudUploadAlt} from "react-icons/fa";
import {deleteRequest, getRequest, postRequest} from "../additionals/Requests";
import {FaCheckCircle} from "react-icons/fa";
import {GiMagnifyingGlass} from "react-icons/gi";
import FullScreenImage from "./FullScreenImage";


function Gallery(props) {
    const [listOfUserImages, setListOfUserImages] = useState([])
    const [fullScreenImageId, setFullScreenImageId] = useState("")

    const [selectedImageToUpload, setSelectedImageToUpload] = useState({});
    const [selectedImagesToRemove, setSelectedImagesToRemove] = useState([])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRequest('/api/get-images', {}, (response) => {
            setLoading(false)
            setListOfUserImages(response.data)
        })
    }, [loading])

    const uploadImage = () => {
        const formData = new FormData()
        formData.append('file', selectedImageToUpload)
        formData.append('upload_preset', 'ine3dksf')

        axios({
            method: "post",
            url: 'https://api.cloudinary.com/v1_1/dfvo9ybxe/image/upload',
            data: formData,
        }).then((response) => {
            const imageData = {
                image_id: response.data.public_id,
                original_filename: response.data.original_filename,
                file_format: response.data.format,
                type: response.data.type,
            }

            postRequest('/api/save-image', imageData,
                () => {
                    setLoading(true)
                    setSelectedImageToUpload({})
                },
                (error) => console.log(error.data))
        }).catch((error) => console.log(error.data))
    }

    const removeImage = () => {
        deleteRequest('/api/remove-image', {image_ids: selectedImagesToRemove}, () => {
            getRequest('/api/get-images', {},
                (response) => setListOfUserImages(response.data))},
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

        return listOfUserImages.map((image, index) => (
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

    return (
        <div>
            {fullScreenImageId.length !== 0 &&
            <FullScreenImage imgId={fullScreenImageId} setFullScreenImageId={setFullScreenImageId}/>}

            <div className="container" style={{color: 'white'}}>
                <h1 className="title">Image gallery</h1>
                <div className="navigation-bar">
                    <div className="image-selection">

                        <label htmlFor="file-upload" className="custom-file-upload">
                            <FaCloudUploadAlt/> Select image
                        </label>

                        <input id="file-upload" type="file" onChange={(event) => {
                            setSelectedImageToUpload(event.target.files[0])
                            event.target.value = ""
                        }}/>

                        {selectedImageToUpload.name &&
                        <React.Fragment>
                            <div className="selected-image-name">{selectedImageToUpload.name}</div>
                            <button className="submit-upload" onClick={uploadImage}>Upload image</button>
                        </React.Fragment>}
                    </div>

                    <div className="extra-options">
                        <div className="remove-button" onClick={() => removeImage()}>Remove images</div>
                        <div className="select-all">Select all images</div>
                        <div className="image-per-page">Image per page</div>
                    </div>

                </div>

                {loading
                    ? <div className="gallery">Loading</div>
                    : <div className="gallery">{createImageContainers()}</div>}
            </div>
        </div>
    );
}

export default Gallery;
