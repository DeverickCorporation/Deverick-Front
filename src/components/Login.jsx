import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';
import { API_URL } from "../config"


function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [resp, setResp] = useState("");

  const handleLogin = () => {
    axios.post(API_URL+'/auth/login', {
      login: login,
      password: password
    })
    .then(response => {
      console.log(response.data);
      setResp(response.data["message"])
    })
    .catch(error => {
      console.log(error);
      setResp(error.response.data["message"])
    });
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
        <button onClick={handleLogin}>Register</button>
      </div>
    </div>
  );
}

export default Login;