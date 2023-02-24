import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';
import { API_URL } from "../config"


function Register() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resp, setResp] = useState("");


  const handleRegestration = () => {
    axios.post(API_URL + '/auth/registration', {
      login: login,
      password: password,
      name: name
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
      <h1>Register</h1>
      <label>Login:</label>
      <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>{resp}</label>

      <br />
      <button onClick={handleRegestration}>Register</button>
      <button onClick={handleRegestration}>Login</button>
    </div>
  );
}

export default Register;