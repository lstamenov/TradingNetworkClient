import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="about">
            <h2>Welcome to my trading network</h2>
            <p>Buy and sell with just a few clicks!</p>
            <p>No accounts needed!</p>
            <p>No commissions, no limits for posts, everything you earn is yours!</p>
            <p>Have difficulties? Try looking at the <Link to="/faq">FAQ</Link></p>
        </div>
    )
}

export default Home;