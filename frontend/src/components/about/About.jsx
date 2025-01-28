import React from "react";
import "./About.css";
import BaseImage from "../../assets/Base.png"

const About = () => {
    return (
        <section className="aboutSection">
            <h2>Welcome to <strong>INVBENCH</strong></h2>
            <p>
                The smart inventory solution for small businesses. Simplify
                your product management and take control of your store with ease and confidence.
            </p>
            <img src={BaseImage} alt="" />
        </section>
    );
};

export default About;