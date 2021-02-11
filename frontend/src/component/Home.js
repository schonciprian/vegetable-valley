import React from 'react';
import {FaLeaf} from "react-icons/fa";


function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to Vegetable Valley!</h1>
            <p className="self-introduction">My name is Ciprian and I love spending time in the garden while
                I am listening to the chirping of birds or the noise of the wind.
                I started gardening back in my childhood during summer breaks in my
                grandparents garden with an own small plot.</p>
            <div className="app-introduction">
                <h2>What is Vegetable Valley?</h2>
                <p>Vegetable Valley is an online application where you can find many information about vegetables in the following topics:</p>
                <ul>
                    <li><FaLeaf className="leaf-icon"/><span>Sowing depth</span></li>
                    <li><FaLeaf className="leaf-icon"/><span>Line spacing</span></li>
                    <li><FaLeaf className="leaf-icon"/><span>Row spacing</span></li>
                    <li><FaLeaf className="leaf-icon"/><span>Planting guidelines by month to month</span></li>
                    <li><FaLeaf className="leaf-icon"/><span>How to grow</span></li>
                    <li><FaLeaf className="leaf-icon"/><span>How to harvest</span></li>
                </ul>
            </div>

        </div>
    );
}

export default Home;