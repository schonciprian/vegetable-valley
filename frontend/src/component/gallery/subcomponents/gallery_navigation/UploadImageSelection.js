import React, {useState} from 'react';
import {FaCloudUploadAlt, FaSpinner} from "react-icons/fa";
import axios from "axios";
import {postRequest} from "../../../additionals/Requests";

function UploadImageSelection(props) {
    const [selectedImageToUpload, setSelectedImageToUpload] = useState({});
    const [uploading, setUploading] = useState(false)

    const uploadImage = () => {
        setUploading(true);
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
                    props.setLoading(true)
                    setUploading(false)
                    setSelectedImageToUpload({})
                },
                (error) => console.log(error.data))
        }).catch((error) => console.log(error.data))
    }

    return (
        <div className="upload-image-selection">

            <label htmlFor="file-upload" className="custom-file-upload"><FaCloudUploadAlt/> Select image</label>

            <input id="file-upload" type="file" onChange={(event) => {
                setSelectedImageToUpload(event.target.files[0])
                event.target.value = ""
            }}/>

            {selectedImageToUpload.name &&
            <React.Fragment>
                <div className="selected-image-name">{selectedImageToUpload.name}</div>
                <button className="submit-upload" onClick={uploadImage}>Upload image</button>
            </React.Fragment>}

            {uploading && <FaSpinner className="uploading-loading-spinner"/>}
            {/*<FaSpinner className="uploading-loading-spinner"/>*/}

        </div>
    );
}

export default UploadImageSelection;
