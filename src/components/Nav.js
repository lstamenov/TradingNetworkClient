import React, { useEffect, useState } from "react";
import './Nav.css';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

let Nav = () => {
    const history = useHistory();
    
    const authButtonHandler = () => {
        if(document.getElementById('login-logout').innerText === 'Login'){
            history.push('/login')
        }else{
            document.getElementById('login-logout').innerText = 'Login';
            localStorage.removeItem('user');
        }
    }
    
    return (
        <div className="nav">
            <button onClick={authButtonHandler} id="login-logout">Login</button>
            <button className="btn"><Link to="/">Home</Link></button>
            <button className="btn"><Link to="/about">About</Link></button>
            <button className="btn"><Link to="/items">Items</Link></button>
        </div>
    );
}

export default Nav;