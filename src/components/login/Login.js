import React from 'react';
import './Login.css';
import AuthService from '../../services/auth.service.js';

const Login = () => {
    const loginButtonHandler = (e) => {
        e.preventDefault();
        let username = document.getElementsByTagName('input')[0].value;
        let password = document.getElementsByTagName('input')[1].value;
        AuthService.login(username, password);
    }
    return (
        <div id="login-wrapper">
            <form id="login-form">
                <label>Username</label><br/>
                <input type="text" /><br/>
                <label>Password</label><br/>
                <input type="password" /><br/> 
                <button onClick={loginButtonHandler} id="login-btn">Login</button>
            </form>
        </div>
    )
}

export default Login;