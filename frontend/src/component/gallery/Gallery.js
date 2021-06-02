import React, {useContext, useEffect, useState} from 'react';
import {Image} from 'cloudinary-react';
import '../../stylesheet/basic/basic_main/UserImages.css';
import {GiMagnifyingGlass} from "react-icons/gi";
import FullScreenImage from "./FullScreenImage";
import {GalleryPaginationContext} from "./contexts/GalleryPaginationContext";
import Pagination from "./subcomponents/gallery_pagination/Pagination";
import TagBar from "./subcomponents/gallery_tag/TagBar";
import NavigationBar from "./subcomponents/gallery_navigation/NavigationBar";
import {GalleryImagesContext} from "./contexts/GalleryImagesContext";
import {getRequest, postRequest} from "../additionals/Requests";
import {sweetalertSidePopup} from "../additionals/SweetAlert";
import {GalleryDraggedTagContext} from "./contexts/GalleryDraggedTag";


function Gallery(props) {
    const [fullScreenImageId, setFullScreenImageId] = useState("")
    const [loading, setLoading] = useState(true);

    const {listOfUserImages, setListOfUserImages, selectedImagesToRemove, setSelectedImagesToRemove} = useContext(GalleryImagesContext)
    const {imagePerPage, actualPageNumber} = useContext(GalleryPaginationContext)
    const {draggedTag, setDraggedTag} = useContext(GalleryDraggedTagContext)


    useEffect(() => {
        getRequest('/api/get-images', {}, (response) => {
            setLoading(false)
            setListOfUserImages(response.data)
        })
    }, [loading, setListOfUserImages])

    const toggleImageSelection = (image) => {
        if (selectedImagesToRemove.includes(image.id)) {
            setSelectedImagesToRemove(selectedImagesToRemove.filter(item => item !== image.id))
        } else {
            setSelectedImagesToRemove([...selectedImagesToRemove, image.id]);
        }
    }

    const saveTagToImage = (event) => {
        const tags = event.target.childNodes
        let alreadyExistedTag = false;
        tags.forEach(tag => {if (tag.dataset.name === draggedTag.tagName) alreadyExistedTag = true})

        if (alreadyExistedTag) return

        const destination = event.target.parentElement.dataset.id ?? null;
        if (destination !== null) {
            const data = {
                image_id: destination,
                tag_id: draggedTag.id,
            }
            postRequest('/api/save-tag-to-image', data,
                () => {
                    sweetalertSidePopup(`"${draggedTag.tagName}" tag added to image`, 3000)
                    setLoading(true)
                    setDraggedTag({})
                })
        }
    }

    const createImageContainers = () => {
        if (listOfUserImages.length === 0) return <div className="text">No images available</div>;

        return listOfUserImages.slice(imagePerPage * actualPageNumber - imagePerPage, imagePerPage * actualPageNumber).map((image, index) => (
            <div key={index} className={`image-container ${selectedImagesToRemove.includes(image.id) ? " active" : ""}`}
                 data-imageid={image.image_id}
                 data-id={image.id}
                 onClick={() => toggleImageSelection(image)}>
                <div className="image-tag-list"
                     onDragOver={(event => event.preventDefault())}
                     onDrop={(event) => saveTagToImage(event)}>

                    {image.tagColor
                        ? image.tagColor.split(',').map((color, colorIndex) => (
                            <div key={colorIndex} data-name={image.tagName.split(',')[colorIndex]} style={{backgroundColor: color, width: "30px", height: "30px"}}/>))
                        : ""}

                </div>
                    <Image cloudName="dfvo9ybxe" publicId={image.image_id}/>

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

                <TagBar/>

                <div className="gallery">
                    {loading ? <div className="text">Loading...</div> : createImageContainers()}
                </div>

                <Pagination listOfUserImagesLength={listOfUserImages.length}/>
            </div>
        </div>
    );
}

export default Gallery;
