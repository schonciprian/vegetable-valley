import React, {useState} from 'react';

// Stylesheets
import '../../../stylesheet/basic/basic_sub/MyGardenImage.css';

// Images
import my_garden_1 from "../../../image/my_garden_2020/my_garden_1.jpg";


function MyGardenImage() {
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [openYAxis, setOpenYAxis] = useState(0);

    const fullScreen = () => {
        setShowFullScreen(!showFullScreen);
        setOpenYAxis(window.scrollY);
    }

    window.onscroll = () => {
        if (window.scrollY < openYAxis - 150 || window.scrollY > openYAxis + 150) {
            setShowFullScreen(false)
        }
    }

    return (
        <div className="my-garden">
            <h2>A picture of my small vegetable garden in 2020:</h2>
            <img onClick={fullScreen}
                 style={showFullScreen
                     ? {transform: "scale(1.2)", transition: "all 0.3s ease-out", margin: "70px 0"}
                     : {transform: "scale(1)", transition: "all 0.3s ease-out"}}
                 src={my_garden_1}
                 alt="My garden plot in 2020"
                 title="My garden plot in 2020"
                 width="80%"/>
        </div>
    );
}

export default MyGardenImage;