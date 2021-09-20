import React from 'react';
import './Footer.css';
import linkedInLogo from '../about/linkedin.png';
import emailLogo from '../about/gmail.png';
import logo from '../about/pngegg.png';

const Footer = () => {
    return (
        <div className="footer">
            <a target="_blank" href="https://www.linkedin.com/in/lyubomir-stamenov-1b97a61b4/"><img className="icons" src={linkedInLogo}/></a>
            <a target="_blank" href="https://github.com/lstamenov"><img className="icons" src={logo}/></a>
        </div>
    )
}

export default Footer;