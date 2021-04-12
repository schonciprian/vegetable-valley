import React from 'react';
import {FaCloudDownloadAlt} from "react-icons/fa";
import html2canvas from "html2canvas";

function DownloadGarden(props) {
    const gardenRef = props.gardenRef;
    const rows = props.rows;
    const columns = props.columns;

    const download = () => {
        const imageWidth = columns <= 6 ? columns * 95 : columns * 86;
        const imageHeight = rows * 86

        const removeButtons = document.querySelectorAll(".remove")
        removeButtons.forEach((button) => button.style.visibility = "hidden")
        gardenRef.current.style.overflow = "visible"
        window.scrollTo(0, 0)
        html2canvas(document.querySelector("#garden"), {
            width: imageWidth,
            height: imageHeight,
            backgroundColor: "#0F1329"
        }).then(canvas => {
            let url = canvas.toDataURL("img/png");
            let a = document.createElement("a");
            a.href = url;
            a.download = "screenshot.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        })
        removeButtons.forEach((button) => button.style.visibility = "visible")
        gardenRef.current.style.overflow = "auto"
    };

    return (
        <button className="option" onClick={() => download()}>
            <FaCloudDownloadAlt/>Download screenshot
        </button>
    );
}

export default DownloadGarden;