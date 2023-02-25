import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from "../config";
import '../styles/login.css';


function Login({ setShowRegister, reg_login, reg_password, setJwtToken }) {
    const [login, setLogin] = useState(reg_login);
    const [password, setPassword] = useState(reg_password);
    const [resp, setResp] = useState(reg_login ? "Registration successful you can log in now" : "");


    const handleLogin = () => {
        axios.post(API_URL + '/auth/login', {
            login: login,
            password: password
        })
            .then(response => {
                console.log(response.data);
                setResp(response.data["message"])
                setJwtToken(response.data["token"])
                localStorage.setItem('jwt_token', response.data["token"])

            })
            .catch(error => {
                console.log(error);
                setResp(error.response.data["message"])
            });
    }

    const handleShowRegister = () => {
        console.log("Go to register");
        setShowRegister(true);
    }

    return (
        <div>
            <h1>Login</h1>
            <label>Login:</label>
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
            <br />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>{resp}</label>

            <br />
            <div className='auth-button-container'>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleShowRegister}>Register</button>
            </div>
        </div>
    );
}

export default Login;