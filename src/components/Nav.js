import React, { useEffect, useState } from "react";
import './Nav.css';
import {Link} from 'react-router-dom';

let Nav = () => {
    const [component, setComponent] = useState(<Link to="/login">Login</Link>);
    const logoutHandler = () => {
        localStorage.removeItem('user');
        setComponent(<Link to="/login">Login</Link>);
    }
    useEffect(() => {
        setComponent(localStorage.getItem('user') ?<Link onClick={logoutHandler} to="/">Logout</Link>  :<Link to="/login">Login</Link>);
    }, localStorage.getItem('user'));
    return (
        <div className="nav">
            <button className="shopping-cart">{component}</button>
            <button className="btn"><Link to="/">Home</Link></button>
            <button className="btn"><Link to="/about">About</Link></button>
            <button className="btn"><Link to="/items">Items</Link></button>
        </div>
    );
}

export default Nav;