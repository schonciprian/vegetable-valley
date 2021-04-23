import React from 'react';
import {FaCloudDownloadAlt} from "react-icons/fa";
import html2canvas from "html2canvas";

function DownloadGarden(props) {
    const gardenRef = props.gardenRef;
    const rows = props.rows;
    const columns = props.columns;

    const calculateCellSize = () => {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const cardWidthFromStyle = vw * 0.05;
        const margin = 10 // Sum of top and bottom side
        const border = 4  // Sum of top and bottom side

        switch (true) {
            case cardWidthFromStyle < 40:
                return 45 + margin + border;
            case cardWidthFromStyle > 75:
                return 75 + margin + border;
            default:
                return cardWidthFromStyle + margin + border;
        }
    }

    const calculateImageWidth = () => {
        const row = document.querySelector(".row");
        const rowWidth = row.offsetWidth
        const style = window.getComputedStyle
            ? getComputedStyle(row, null)
            : row.currentStyle;
        const marginLeft = parseInt(style.marginLeft) || 0;
        let marginRight = parseInt(style.marginRight) || 0;
        marginRight = marginRight > 0 ? marginRight : 0;
        const fixImageRightPadding = columns <= 6 ? columns : 0;

        return rowWidth + marginLeft + marginRight + fixImageRightPadding;
    }

    const download = () => {
        // Image width
        const imageWidth = calculateImageWidth(); // FULL IMAGE WIDTH

        // Image height
        const cellHeightWithBoxModel = calculateCellSize();
        const imageHeight = rows * cellHeightWithBoxModel; // FULL IMAGE HEIGHT

        // Prepare image for screenshot
        const removeButtons = document.querySelectorAll(".remove")
        removeButtons.forEach((button) => button.style.visibility = "hidden")
        gardenRef.current.style.overflow = "visible"
        window.scrollTo(0, 0)

        // Create screenshot of the garden and start to download it
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

        // Set back default values
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
