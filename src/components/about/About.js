import React from 'react';
import './About.css';
import logo from './pngegg.png';
import linkedIn from './linkedin.png';


const About = () => {
    return (
        <div className="about">
            <h2>Trading Network</h2>
            <p>This is my first full-stack project using React for the front-end and Spring for the back-end. Link to the GitHub Repository <i><a target="_blank" href="https://github.com/lstamenov/OnlineShop">here</a></i>. 
            </p>
            <p>Author: <i><a target="_blank" href="https://www.linkedin.com/in/lyubomir-stamenov-1b97a61b4/">Lyubomir Stamenov</a></i></p>
            <h2 id="contact-me">Contact me</h2>
            <a target="_blank" href="https://github.com/lstamenov"><img src={logo}/></a>
            <a target="_blank" href="https://www.linkedin.com/in/lyubomir-stamenov-1b97a61b4/"><img src={linkedIn}/></a>
        </div>
    );
}

export default About;