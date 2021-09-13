import React, { useState } from 'react';
import './Login.css';
import AuthService from '../../services/auth.service.js';
import { useHistory } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const loginButtonHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const isValid = await AuthService.login(username, password);
        setTimeout(() => {
            setIsLoading(false);
            if(isValid){
                history.push('/');
                window.location.reload();
            }else{
                setError('Invalid username or password');
            }
        }, 3000);
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
            {isLoading && <div className="loader"><HashLoader color={"white"} size={150}/></div>}
        </div>
    )
}

export default Login;