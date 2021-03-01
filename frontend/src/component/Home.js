import React, {useState} from 'react';
import {FaLeaf} from "react-icons/fa";
import my_garden_1 from '../image/my_garden_2020/my_garden_1.jpg';
import {Link} from "react-router-dom";
import {Contact} from "./Contact";


function Home() {

    const [showFullScreen, setShowFullScreen] = useState(false);
    const [openYAxis, setOpenYAxis] = useState(0);

    const vegetableInformation = [
        "Basic information",
        "Sowing depth",
        "Line spacing",
        "Row spacing",
        "Planting guidelines by month to month",
        "How to grow",
        "How to harvest",
    ];

    const futurePlans = [
        "More available vegetables",
        "Expand with fruits",
        "Create you own garden",
        "Charts for weather forecast",
        "Planning page to plan gardening tasks by month to month",
    ];

    const fullScreen = () => {
        setShowFullScreen(!showFullScreen);
        console.log(showFullScreen);
        setOpenYAxis(window.scrollY);
    }

    window.onscroll = () => {
        if (window.scrollY < openYAxis - 150 || window.scrollY > openYAxis + 150) {
            setShowFullScreen(false)
        }
    }

    return (
        <div className="home-container">
            <h1>Welcome to Vegetable Valley!</h1>

            {/****************/}
            {/* About myself */}
            {/****************/}
            <p className="self-introduction">My name is Ciprian and I love spending time in the garden while
                I am listening to the chirping of birds or the noise of the wind.
                I started gardening back in my childhood during summer breaks in my
                grandparents' garden with my own small plot. During the 2020's quarantine I have started a small garden.
                I have planted carrot, kohlrabi, tomato, potato, peas, beans and cucumber.</p>

            {/*************************/}
            {/* About the application */}
            {/*************************/}
            <div className="app-introduction">
                <h2>What is Vegetable Valley?</h2>
                <p>Vegetable Valley is an online application where you can find many
                    <Link className="highlight" to="/grow-guides"> information about vegetables </Link>
                    such as:</p>
                <ul>
                    {vegetableInformation.map((example, index) =>
                        <li key={index}><FaLeaf className="leaf-icon"/><span>{vegetableInformation[index]}</span></li>)
                    }
                </ul>
                <p>Vegetable Valley also helps you to search for
                    <Link className="highlight" to="/weather-forecast"> weather forecast </Link>
                    according to a chosen settlement. Knowing the following weather conditions would help a
                    lot for you to plan your tasks in the garden for the next days.</p>
            </div>

            {/****************/}
            {/* Future plans */}
            {/****************/}
            <div className="app-introduction">
                <h2>Future plans for Vegetable Valley:</h2>
                <ul>
                    {futurePlans.map((example, index) =>
                        <li key={index}><FaLeaf className="leaf-icon"/><span>{futurePlans[index]}</span></li>)
                    }
                </ul>
                <p>I hope you like Vegetable Valley and find it useful!
                    I would love any feedback or suggestions for improvement.</p>
            </div>

            {/****************/}
            {/* Contact page */}
            {/****************/}
            <Contact />

            {/***************************/}
            {/* Image of my garden 2020 */}
            {/***************************/}
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
        </div>
    );
}

export default Home;