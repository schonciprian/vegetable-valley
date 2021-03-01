import React from 'react';
import {Link} from "react-router-dom";

// Components
import {Contact} from "../basic_sub/Contact";
import MyGardenImage from "../basic_sub/MyGardenImage";

// Stylesheets
import '../../../stylesheet/basic/basic_main/Home.css';

// React-icon
import {FaLeaf} from "react-icons/fa";
//**************************************************//

export function Home() {
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

    return (
        <div className="home-container">
            <h1>Welcome to Vegetable Valley!</h1>

            {/****************/}
            {/* About myself */}
            {/****************/}
            <p>My name is Ciprian and I love spending time in the garden while
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
            <MyGardenImage />
        </div>
    );
}