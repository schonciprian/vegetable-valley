import React, {useState} from 'react';
import axios from "axios";
import {Image} from 'cloudinary-react';
import '../../../../stylesheet/basic/basic_main/UserImages.css';
import {FaCloudUploadAlt} from "react-icons/fa";


function UserImages(props) {
    const [selectedImage, setSelectedImage] = useState("");
    const [listOfUserImageIds, setListOfUserImageIds] = useState([
        "ly5f2k6e2dyeu7dialof", "xrpayghpxko8hjhif4kd", "ww9ef3yfgxnnkj4efh0u", "santrcbvbahrjhuf6jvw",
        "rxq9mx0ltua3qlftx1wm", "xsvoyjfbm6zwewfinsan", "oj6wjtyl748ujhgcwzwr", "xsvoyjfbm6zwewfinsan",
        "oj6wjtyl748ujhgcwzwr"]);

    const uploadImage = () => {
        const formData = new FormData()
        formData.append('file', selectedImage)
        formData.append('upload_preset', 'ine3dksf')

        axios({
            method: "post",
            url: 'https://api.cloudinary.com/v1_1/dfvo9ybxe/image/upload',
            data: formData,
        }).then((response) => {
            console.log(response);
            // imageId, original_filename, format, type = uploaded
            setSelectedImage("")
            setListOfUserImageIds([response.data.public_id, ...listOfUserImageIds])
        }).catch((error) => {
            console.log(error.data);
        })
    }

    const createImageContainers = () => {
        return listOfUserImageIds.map((imageID, index) => (
            <div key={index} className="image-container">
                <Image cloudName="dfvo9ybxe" publicId={imageID}/>
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
                    }}/>

                    {selectedImage.name && <div className="selected-image-name">{selectedImage.name}</div>}

                    {selectedImage.name &&
                    <button className="submit-upload" onClick={uploadImage}>Upload image</button>}
                </div>
            </div>

            <div className="gallery">
                {createImageContainers()}
            </div>
        </div>
    );
}

export default UserImages;
