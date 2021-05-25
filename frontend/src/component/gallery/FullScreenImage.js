import React from 'react';
import '../../stylesheet/gallery/FullScreenImage.css'
import {Image} from "cloudinary-react";

function FullScreenImage(props) {
    return (
        <div className="full-screen-container" onClick={() => props.setFullScreenImageId("")}>
            <Image cloudName="dfvo9ybxe" publicId={props.imgId}/>
        </div>
    );
}

export default FullScreenImage;
