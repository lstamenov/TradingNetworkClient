import React, { useState } from 'react';
import validator from '../../services/register.validatons.js';
import authService from '../../services/auth.service.js';
import { useHistory } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const isValid = () => {
        if (emailError.length > 0 || usernameError.length > 0 ||
            firstNameError.length > 0 || lastNameError.length > 0 ||
            passwordError.length > 0){
                return false;
            }
        return true;
    }

    const history = useHistory();

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');

    const clearInputFields = () => {
        let inputs = document.querySelectorAll('input');
        [...inputs].forEach(input => {
            if(input.value !== 'Submit'){
                input.value = '';
            }
        });
    }

    const handleFirstNameChange = (e) => {
        setFirstNameError(validator.validateBaseFields(e.target.value));
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastNameError(validator.validateBaseFields(e.target.value));
        setLastName(e.target.value);
    }

    const handleUsernameChange = (e) => {
        setUsernameError(validator.validateBaseFields(e.target.value));
        setUsername(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmailError(validator.validateEmail(e.target.value));
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordError(validator.validatePassword(e.target.value, confPassword));
        setPassword(e.target.value);
    }

    const handleConfPasswordChange = (e) => {
        setConfPassword(e.target.value);
        setPasswordError(validator.validatePassword(e.target.value, password));
    }


    const submitRegisterForm = (e) => {
        e.preventDefault();
        if(isValid()){
            authService.register(firstName, lastName, email, username, password);
            clearInputFields();
            history.push('/login');
        }
    }

    return (
        <div id="registration-wrapper">
            <form>
                <label>First name</label><br/>
                <input autoComplete="off" id="fname" onChange={handleFirstNameChange}/><br/>
                <div className="errors"><small>{firstNameError}</small></div>
                <label>Last name</label><br/>
                <input id="lname" onChange={handleLastNameChange}/><br/>
                <div className="errors"><small>{lastNameError}</small></div>
                <label>Email</label><br/>
                <input id="email" onChange={handleEmailChange}/><br/>
                <div className="errors"><small>{emailError}</small></div>
                <label>Username</label><br/>
                <input id="username" onChange={handleUsernameChange}/><br/>
                <div className="errors"><small>{usernameError}</small></div>
                <label>Password</label><br/>
                <input id='password' type="password" onChange={handlePasswordChange}/><br/>
                <div className="errors"><small>{passwordError}</small></div>
                <label>Confirm password</label><br/>
                <input id="password-conf" type="password" onChange={handleConfPasswordChange}/><br/>
                <button onClick={submitRegisterForm} type="button" id="register-button">Submit</button>
            </form>
        </div>
    )
}

export default Register;