import React, {useContext, useEffect, useState} from 'react';
import {Image} from 'cloudinary-react';
import '../../stylesheet/basic/basic_main/UserImages.css';
import {FaCheckCircle} from "react-icons/fa";
import {GiMagnifyingGlass} from "react-icons/gi";
import FullScreenImage from "./FullScreenImage";
import {GalleryPaginationContext} from "./contexts/GalleryPaginationContext";
import Pagination from "./subcomponents/gallery_pagination/Pagination";
import TagBar from "./subcomponents/gallery_tag/TagBar";
import {GalleryTagsContext} from "./contexts/GalleryTagsContext";
import NavigationBar from "./subcomponents/NavigationBar";
import {GalleryImagesContext} from "./contexts/GalleryImagesContext";
import {getRequest} from "../additionals/Requests";


function Gallery(props) {
    const [fullScreenImageId, setFullScreenImageId] = useState("")
    const [loading, setLoading] = useState(true);

    const {listOfUserImages, setListOfUserImages, selectedImagesToRemove, setSelectedImagesToRemove} = useContext(GalleryImagesContext)
    const {imagePerPage, actualPageNumber} = useContext(GalleryPaginationContext)
    const {existingTags} = useContext(GalleryTagsContext)

    useEffect(() => {
        getRequest('/api/get-images', {}, (response) => {
            setLoading(false)
            setListOfUserImages(response.data)
        })
    }, [loading])

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
                <div className="image-tag-list">

                    {/*{existingTags.map((tag, index) => (*/}
                    {/*    image.tagIds.includes(tag.id) ?*/}
                    {/*        <div key={index} style={{backgroundColor: tag.color, width: "30px", height: "30px"}}/> : ""*/}
                    {/*))}*/}

                </div>
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

            <div className="container">
                <h1 className="title">Image gallery</h1>

                <NavigationBar setLoading={setLoading}/>

                <TagBar />

                <div className="gallery">
                    {loading ? <div className="text">Loading...</div> : createImageContainers()}
                </div>

                <Pagination listOfUserImagesLength={listOfUserImages.length}/>
            </div>
        </div>
    );
}

export default Gallery;
