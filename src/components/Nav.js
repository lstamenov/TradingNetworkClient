import React, { useEffect, useState } from "react";
import './Nav.css';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/auth.service';

let Nav = () => {
    
    return (
        <div className="nav">
            <button id="login-logout">Login</button>
            <button className="btn"><Link to="/">Home</Link></button>
            <button className="btn"><Link to="/about">About</Link></button>
            <button className="btn"><Link to="/items">Items</Link></button>
        </div>
    );
}

export default Nav;