import React, { useState } from 'react';
import './Login.css';
import AuthService from '../../services/auth.service.js';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const loginButtonHandler = async (e) => {
        e.preventDefault();
        const isValid = await AuthService.login(username, password);
        if(isValid){
            document.getElementById('login-logout').innerHTML = 'Logout';
            history.push('/');
        }else{
            setError('Invalid username or password');
        }
    }

    return (
        <div id="login-wrapper">
            <form id="login-form">
                <label>Username</label><br/>
                <input type="text" onChange={(e) => setUsername(e.target.value)}/><br/>
                <label>Password</label><br/>
                <input type="password" onChange={(e) => setPassword(e.target.value)} /><br/>
                <button onClick={loginButtonHandler} id="login-btn">Login</button>
                <div className="errors"><small id="login-error">{error}</small></div> 
            </form>
        </div>
    )
}

export default Login;