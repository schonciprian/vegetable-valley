import React, {useContext, useEffect, useState} from 'react';
import '../../stylesheet/garden/GardenPlanner.css'
import dirt from "../../image/garden/dirt.jpeg";
import {Vegetables} from "../grow_guides/Descriptions";
import axios from "axios";
import {environmentVariables} from "../../EnvironmentVariables";
import html2canvas from "html2canvas";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {FaCloudDownloadAlt} from "react-icons/fa";
import {GardenSizeContext} from "./GardenSizeContext";

function GardenPlanner() {
    const [garden, setGarden] = useState([]);
    const [vegetables, setVegetables] = useState([]);
    const [draggedVegetable, setDraggedVegetable] = useState({})
    const [refresh, setRefresh] = useState(false)
    const [gardenSize, setGardenSize] = useContext(GardenSizeContext);
    const [rows, setRows] = useState(gardenSize.rows);
    const [columns, setColumns] = useState(gardenSize.columns);

    useEffect(() => {
        let source = axios.CancelToken.source();

        ///////////////////////////////////////////////
        // Fill garden state with data from database //
        ///////////////////////////////////////////////
        axios({
            method: "get",
            url: `${environmentVariables.BACKEND_URL}/api/garden`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
        }, {cancelToken: source.token}).then((res) => {
            let garden = [];

            for (let i = 0; i < rows; i++) {
                let row = [];
                for (let j = 0; j < columns; j++) {
                    let vegetable = res.data[0].find(cell => cell.cell_row === i && cell.cell_column === j)
                        ?? {
                            cell_row: i,
                            cell_column: j,
                            cell_name: '',
                            cell_picture_url: dirt
                        };
                    row.push({
                        id: `${vegetable.cell_row}-${vegetable.cell_column}`,
                        name: vegetable.cell_name,
                        pictureURL: vegetable.cell_picture_url,
                    })
                }
                garden.push(row)
            }
            setGarden(garden)

        }).catch((error) => {
            console.log(error.response.data)
        })

        ///////////////////////////////////////
        // Create available vegetables state //
        ///////////////////////////////////////
        let vegetables = [];
        Object.keys(Vegetables).forEach((vegetable) => {
            vegetables.push({
                id: Vegetables[vegetable].id,
                name: Vegetables[vegetable].name,
                pictureURL: Vegetables[vegetable].pictureURL,
            })
        })
        setVegetables(vegetables)
        setRefresh(false)

        //////////////////////////////////
        // On unmount cancel axios call //
        //////////////////////////////////
        return () => {
            source.cancel();
        }
    }, [refresh, rows, columns, gardenSize])


    const onDrag = (event, vegetable) => {
        event.preventDefault();
        setDraggedVegetable(vegetable)
    }

    const onDragOver = (event) => {
        event.preventDefault();
    }

    const onDrop = (event) => {
        const destination = event.target.parentElement.dataset.id ?? null;

        if (destination !== null) {
            axios({
                method: "post",
                url: `${environmentVariables.BACKEND_URL}/api/garden`,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json, text/plain, */*",
                    Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
                },
                data: {
                    cell_row: destination.split("-")[0],
                    cell_column: destination.split("-")[1],
                    cell_name: draggedVegetable.name,
                    cell_picture_url: draggedVegetable.pictureURL,
                }
            }).then((res) => {
                // console.log(res.data);
            }).catch((error) => {
                console.log(error.response.data)
            })
        }
        changeCellToVegetable(destination);
        setDraggedVegetable({});
    }

    const changeCellToVegetable = (destination) => {
        const destinationCell = garden.flat().find(cell => cell.id === destination)

        destinationCell.name = draggedVegetable.name;
        destinationCell.pictureURL = draggedVegetable.pictureURL;
    }

    const removeVegetableFromCell = (cellId) => {
        axios({
            method: "delete",
            url: `${environmentVariables.BACKEND_URL}/api/garden`,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
            data: {
                cell_row: cellId.split("-")[0],
                cell_column: cellId.split("-")[1],
            }
        }).then((res) => {
            setRefresh(true);

        }).catch((error) => {
            console.log(error.response.data)
        })
    }

    const download = () => {
        const imageWidth = columns <= 6 ? columns * 95 : columns * 79;
        const imageHeight = rows * 79

        const removeButtons = document.querySelectorAll(".remove")
        removeButtons.forEach((button) => button.style.visibility = "hidden")

        document.querySelector("#garden").style.overflow = "visible"
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
        document.querySelector("#garden").style.overflow = "auto"
    };

    return (
        <div className="garden-planner">
            <div className="garden-container">
                <h1>Your garden</h1>
                <div className="option-container">
                    <button className="option" onClick={() => download()}>
                        <FaCloudDownloadAlt/>Download screenshot
                    </button>
                    <button className="option" onClick={() => {
                        setGardenSize(prevData => ({
                            ...prevData,
                            rows: rows + 1,
                        }))
                        setRows(rows + 1)
                    }}>
                        <BsFillPlusCircleFill/>Add row
                    </button>
                    <button className="option" onClick={() => {
                        setGardenSize(prevData => ({
                            ...prevData,
                            columns: columns + 1,
                        }))
                        setColumns(columns + 1)
                    }}>
                        <BsFillPlusCircleFill/>Add column
                    </button>
                </div>
                <div id="garden"
                     className="garden"
                     onDrop={(event) => onDrop(event)}
                     onDragOver={(event => onDragOver(event))}>
                    {garden.map((row, index) =>
                        <div className="row" key={index}>
                            {row.map(cell =>
                                <div key={cell.id} className="cell" data-id={cell.id}>
                                    {cell.name.length !== 0 ?
                                        <div className="remove"
                                             onClick={() => removeVegetableFromCell(cell.id)}>X</div> : ""}
                                    <img draggable={false} src={cell.pictureURL} alt=""/>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="vegetable-list-container">
                <h1>Available vegetables</h1>
                <div className="option-container" style={{visibility: "hidden"}}>
                    <button className="option" onClick={() => download()}>
                        <FaCloudDownloadAlt/>Download screenshot
                    </button>
                </div>
                <div className="vegetable-list">
                    {vegetables.map(vegetable =>
                        <div key={vegetable.name}
                             id={vegetable.id}
                             className="vegetable-container draggable"
                             draggable
                             onDrag={(event) => onDrag(event, vegetable)}>
                            <div className="vegetable-name">{vegetable.name}</div>
                            <img draggable={false} src={vegetable.pictureURL} alt=""/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GardenPlanner;