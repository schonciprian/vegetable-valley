import React, { useState, createContext } from "react";

export const GalleryImagesContext = createContext(null);

export const GalleryImagesProvider = (props) => {
    const [listOfUserImages, setListOfUserImages] = useState([
        {id: 75, image_id: "ntbbiqljxaovxy5dsik6", original_filename: "screenshot (19)", format: "png", type: "upload", tagIds: [1,3]},
        {id: 74, image_id: "sxvbxkg5ww4azf2y7ren", original_filename: "screenshot", format: "png", type: "upload", tagIds: [3,6]},
        {id: 72, image_id: "wkoff8gisjrvjrljzhad", original_filename: "screenshot (16)", format: "png", type: "upload", tagIds: [1,2,3,4]},
        {id: 70, image_id: "pnrudtk6td7jvytwjpqm", original_filename: "screenshot", format: "png", type: "upload", tagIds: [5]},
        {id: 69, image_id: "rhiubkzlzwmd1egyqffh", original_filename: "screenshot (3)", format: "png", type: "upload", tagIds: [1,2]},
        {id: 68, image_id: "mgw0wc8nrpqghitcydrk", original_filename: "screenshot (5)", format: "png", type: "upload", tagIds: [1,3,4,6]},
        {id: 67, image_id: "it54mqm7dyk2l6eudlpl", original_filename: "screenshot (15)", format: "png", type: "upload", tagIds: [3,4]},
        {id: 66, image_id: "jhrkgqitbm7klvzeo30l", original_filename: "my_garden_2", format: "jpg", type: "upload", tagIds: [4]},
        {id: 65, image_id: "zu4ukdpxlyaheniorn4b", original_filename: "my_garden_3", format: "jpg", type: "upload", tagIds: [2,5]},
        {id: 64, image_id: "yzejop0wsswmzemtihot", original_filename: "my_garden_4", format: "jpg", type: "upload", tagIds: [6]},
        {id: 63, image_id: "a7quklorpwwuq1arg2by", original_filename: "my_garden_5", format: "jpg", type: "upload", tagIds: [2,4]},
        {id: 62, image_id: "b3o3accatuxfv2jm6rca", original_filename: "my_garden_6", format: "jpg", type: "upload", tagIds: [1,4,5]},
        {id: 61, image_id: "vgnah0wz5qhkpb2m0uv5", original_filename: "my_garden_1", format: "jpg", type: "upload", tagIds: [2,3]}])
    const [selectedImagesToRemove, setSelectedImagesToRemove] = useState([])


    return (
        <GalleryImagesContext.Provider value={{
            listOfUserImages, setListOfUserImages,
            selectedImagesToRemove, setSelectedImagesToRemove
        }}>
            {props.children}
        </GalleryImagesContext.Provider>
    );
};

