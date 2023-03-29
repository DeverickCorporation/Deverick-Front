import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from "../config";
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom'


function Register({ setShowRegister, setAutoLogin }) {
  const [password, setPass] = useState('');
  const [login, setLogin] = useState('');

  const [name, setName] = useState('');
  const [resp, setResp] = useState("");
  const navigate = useNavigate();


  function handleRegestration() {
    axios.post(API_URL + '/auth/registration', {
      login: login,
      password: password,
      name: name
    })
      .then(response => {
        navigate('/auth/login')
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
      <h1 className='login-title'>Sign up</h1>
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
      <div className='main-buttons-container'>
        <Link to="/auth/login"><button onClick={() => setShowRegister(false)}>Log in</button></Link>
        <button onClick={handleRegestration}>Sign up</button>
      </div>
    </div>
  );
}

export default Register;