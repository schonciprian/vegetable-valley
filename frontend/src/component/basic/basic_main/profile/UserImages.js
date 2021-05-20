import React, {useState} from 'react';
import axios from "axios";
import {Image} from 'cloudinary-react';
import '../../../../stylesheet/basic/basic_main/UserImages.css';
import {FaCloudUploadAlt} from "react-icons/fa";


function UserImages(props) {
    const [selectedImage, setSelectedImage] = useState("")
    const [publicImageId, setPublicImageId] = useState("")

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
            setSelectedImage("")
            setPublicImageId(response.data.public_id)
        })
            .catch((error) => {
                console.log(error.data);
            })
    }

    return (
        <div className="container" style={{color: 'white'}}>
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
                <div className="image-container"><Image cloudName="dfvo9ybxe" publicId="ww9ef3yfgxnnkj4efh0u"/></div>
                <div className="image-container"><Image cloudName="dfvo9ybxe" publicId="santrcbvbahrjhuf6jvw"/></div>
                <div className="image-container"><Image cloudName="dfvo9ybxe" publicId="xsvoyjfbm6zwewfinsan"/></div>
                <div className="image-container"><Image cloudName="dfvo9ybxe" publicId="oj6wjtyl748ujhgcwzwr"/></div>
                <div className="image-container"><Image cloudName="dfvo9ybxe" publicId="xsvoyjfbm6zwewfinsan"/></div>
                <div className="image-container"><Image cloudName="dfvo9ybxe" publicId="oj6wjtyl748ujhgcwzwr"/></div>

            </div>


        </div>
    );
}

export default UserImages;
