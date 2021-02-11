import React from 'react';
import {FaLeaf} from "react-icons/fa";
import my_garden_1 from '../my_garden_1.jpg';


function Home() {

    const vegetableInformation = [
        "Basic information",
        "Sowing depth",
        "Line spacing",
        "Row spacing",
        "Planting guidelines by month to month",
        "How to grow",
        "How to harvest",
    ]

    return (
        <div className="home-container">
            <h1>Welcome to Vegetable Valley!</h1>

            <p className="self-introduction">My name is Ciprian and I love spending time in the garden while
                I am listening to the chirping of birds or the noise of the wind.
                I started gardening back in my childhood during summer breaks in my
                grandparents' garden with my own small plot.</p>

            <div className="app-introduction">
                <h2>What is Vegetable Valley?</h2>
                <p>Vegetable Valley is an online application where you can find many
                    <span className="highlight"> information about vegetables </span>
                    such as:</p>
                <ul>
                    {vegetableInformation.map((example, index) =>
                        <li><FaLeaf className="leaf-icon"/><span>{vegetableInformation[index]}</span></li>)
                    }
                </ul>
                <p>Vegetable Valley also helps you to search for
                    <span className="highlight"> weather forecast </span>
                    according to a chosen settlement. Knowing the following weather conditions would help a
                    lot for you to plan your tasks in the garden for the next days.</p>
            </div>

            <div className="my-garden">
                <h2>A picture of my small vegetable garden in 2020:</h2>
                <img src={my_garden_1} alt="A picture of my garden." title="My garden plot in 2020" width="80%"/>
            </div>

        </div>
    );
}

export default Home;