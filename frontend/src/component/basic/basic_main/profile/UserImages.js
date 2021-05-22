import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Image} from 'cloudinary-react';
import '../../../../stylesheet/basic/basic_main/UserImages.css';
import {FaCloudUploadAlt} from "react-icons/fa";
import {deleteRequest, getRequest, postRequest} from "../../../additionals/Requests";
import {FaCheckCircle} from "react-icons/fa";


function UserImages(props) {
    const [selectedImage, setSelectedImage] = useState({});
    const [listOfUserImageIds, setListOfUserImageIds] = useState([])
    const [loading, setLoading] = useState(true);
    const [selectedImagesToRemove, setSelectedImagesToRemove] = useState([])

    useEffect(() => {
        getRequest('/api/get-images', {}, (response) => {
            setLoading(false)
            setListOfUserImageIds(response.data)
        })
    }, [loading])

    const uploadImage = () => {
        const formData = new FormData()
        formData.append('file', selectedImage)
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
                    setSelectedImage({})
                },
                (error) => console.log(error.data))

        }).catch((error) => {
            console.log(error.data);
        })
    }

    const removeImage = (event) => {
        deleteRequest('/api/remove-image', {image_id: event.target.dataset.imageid}, () => {
            setLoading(true)
        }, (error) => {
            console.log(error);
        })
    }

    const toggleImageSelection = (image) => {
        if (selectedImagesToRemove.includes(image.image_id)) {
            setSelectedImagesToRemove(selectedImagesToRemove.filter(item => item !== image.image_id))
        } else {
            setSelectedImagesToRemove([...selectedImagesToRemove, image.image_id]);
        }
    }

    const createImageContainers = () => {
        return listOfUserImageIds.map((image, index) => (
            <div key={index} className="image-container" data-imageid={image.image_id}
                 // onClick={(event) => removeImage(event)}
                 onClick={() => toggleImageSelection(image)}
                >
                <Image cloudName="dfvo9ybxe" publicId={image.image_id}/>
                <FaCheckCircle className={`remove-container ${selectedImagesToRemove.includes(image.image_id) ? " active" : ""}`}/>
            </div>
        ))
    }

    return (
        <div className="container" style={{color: 'white'}}>
            <h1 className="title">Image gallery</h1>
            <div className="navigation-bar">
                <div className="image-selection">

                    <label htmlFor="file-upload" className="custom-file-upload">
                        <FaCloudUploadAlt/> Select image
                    </label>

                    <input id="file-upload" type="file" onChange={(event) => {
                        setSelectedImage(event.target.files[0])
                        event.target.value = ""
                    }}/>

                    {selectedImage.name && <div className="selected-image-name">{selectedImage.name}</div>}

                    {selectedImage.name &&
                    <button className="submit-upload" onClick={uploadImage}>Upload image</button>}
                </div>

                <div className="extra-options">
                    <div className="remove-button">Remove images</div>
                    <div className="select-all">Select all images</div>
                    <div className="image-per-page">Image per page</div>
                </div>

            </div>

            {loading && <div className="gallery">Loading</div>}
            {!loading && listOfUserImageIds.length !== 0 && <div className="gallery">{createImageContainers()}</div>}
            {listOfUserImageIds.length === 0 && <div className="gallery">No images available</div>}
        </div>
    );
}

export default UserImages;
