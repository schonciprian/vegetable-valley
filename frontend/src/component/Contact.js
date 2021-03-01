import React from 'react';
import {GoPerson} from "react-icons/go";
import {GrMail} from "react-icons/gr";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import profile_picture from "../image/profile_picture/profile_picture.jpg";

export function Contact() {
    return (
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
    );
}

