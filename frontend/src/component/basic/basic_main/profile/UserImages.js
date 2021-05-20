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
                    <button onClick={uploadImage}>Upload image</button>
                </div>


            </div>


            <Image style={{margin: "50px", width: "300px"}} cloudName="dfvo9ybxe" publicId={publicImageId}/>
        </div>
    );
}

export default UserImages;
