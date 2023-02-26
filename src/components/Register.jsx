import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from "../config";
import '../styles/login.css';


function Register({ setShowRegister, setAutoLogin }) {
  const [password, setPass] = useState('');
  const [login, setLogin] = useState('');

  const [name, setName] = useState('');
  const [resp, setResp] = useState("");


  function handleRegestration() {
    axios.post(API_URL + '/auth/registration', {
      login: login,
      password: password,
      name: name
    })
      .then(response => {
        console.log(response.data);
        setResp(response.data["message"])
        setAutoLogin(login, password)
        setShowRegister(false)
      })
      .catch(error => {
        console.log(error);
        setResp(error.response.data["message"])
      });
  }


  return (
    <div>
      <h1>Sign up</h1>
      <label>Login:</label>
      <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPass(e.target.value)} />
      <br />
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label className='fail-response'>{resp}</label>

      <br />
      <div className='auth-button-container'>
        <button onClick={() => setShowRegister(false)}>Log in</button>
        <button onClick={handleRegestration}>Sign up</button>
      </div>
    </div>
  );
}

export default Register;