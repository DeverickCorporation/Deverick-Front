import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from "../config";
import '../styles/login.css';


function Login({ setShowRegister, reg_login, reg_password, setJwtToken }) {
    const [login, setLogin] = useState(reg_login);
    const [password, setPassword] = useState(reg_password);
    const [resp, setResp] = useState(reg_login ? "Registration successful you can log in now" : "");


    function handleLogin() {
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


    return (
        <div>
            <h1>Log in</h1>
            <label>Login:</label>
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
            <br />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            {resp !== "Registration successful you can log in now" ?
                <label className='fail-response'>{resp}</label> :
                <label className='success-response'>{resp}</label>}

            <br />
            <div className='auth-button-container'>
                <button onClick={() => setShowRegister(true)}>Sign up</button>
                <button onClick={handleLogin}>Log in</button>
            </div>
        </div>
    );
}

export default Login;