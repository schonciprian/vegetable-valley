import React, {useState} from 'react';
import {FaLeaf, FaGithub, FaLinkedin} from "react-icons/fa";
import {GoPerson} from "react-icons/go";
import {GrMail} from "react-icons/gr";
import my_garden_1 from '../my_garden_1.jpg';
import profile_picture from '../profile_picture.jpg';
import {Link} from "react-router-dom";


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
    ]

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

            <p className="self-introduction">My name is Ciprian and I love spending time in the garden while
                I am listening to the chirping of birds or the noise of the wind.
                I started gardening back in my childhood during summer breaks in my
                grandparents' garden with my own small plot.</p>

            <div className="app-introduction">
                <h2>What is Vegetable Valley?</h2>
                <p>Vegetable Valley is an online application where you can find many
                    <Link className="highlight" to="/grow-guides"> information about vegetables </Link>
                    such as:</p>
                <ul>
                    {vegetableInformation.forEach((example, index) =>
                        <li><FaLeaf className="leaf-icon"/><span>{vegetableInformation[index]}</span></li>)
                    }
                </ul>
                <p>Vegetable Valley also helps you to search for
                    <Link className="highlight" to="/weather-forecast"> weather forecast </Link>
                    according to a chosen settlement. Knowing the following weather conditions would help a
                    lot for you to plan your tasks in the garden for the next days.</p>
            </div>

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

            <div className="contact">
                <div className="personal-information">
                    <h2>Contact me:</h2>
                    <p><GoPerson className="contact-icon"/>&nbsp;<span>Name:</span>&nbsp;
                        <span className="contact-value">Ciprián Schőn</span></p>
                    <p><GrMail className="contact-icon"/>&nbsp;<span>Email:</span>&nbsp;
                        <a className="contact-value" href = "mailto: schon.ciprian@gmail.com" target="blank">
                            schon.ciprian@gmail.com
                        </a>
                    </p>
                    <p><FaGithub className="contact-icon"/>&nbsp;<a
                        href="https://github.com/schonciprian/vegetable-valley" target="blank">Code on GitHub</a></p>
                    <p><FaLinkedin className="contact-icon"/>&nbsp;<a
                        href="https://www.linkedin.com/in/cipri%C3%A1n-sch%C5%91n/" target="blank">LinkedIn profile</a>
                    </p>
                </div>
                <img src={profile_picture} alt=""/>
            </div>

        </div>
    );
}

export default Home;