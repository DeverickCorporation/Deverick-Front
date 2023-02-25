import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';
import { API_URL } from "../config"


function Register({ setShowRegister, setLogin, setPassword}) {
  const [curr_pass, setCurrPass] = useState('');
  const [curr_login, setCurrLogin] = useState('');

  const [name, setName] = useState('');
  const [resp, setResp] = useState("");


  const handleRegestration = () => {
    axios.post(API_URL + '/auth/registration', {
      login: curr_login,
      password: curr_pass,
      name: name
    })
      .then(response => {
        console.log(response.data);
        setResp(response.data["message"])
        setLogin(curr_login)
        setPassword(curr_pass)
        console.log(curr_login);
        console.log(curr_pass);
        setShowRegister(false)
      })
      .catch(error => {
        console.log(error);
        setResp(error.response.data["message"])
      });      
  }

  const handleShowRegister = () => {
    console.log("Go to login");
    setShowRegister(false);
}


  return (
    <div>
      <h1>Register</h1>
      <label>Login:</label>
      <input type="text" value={curr_login} onChange={(e) => setCurrLogin(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={curr_pass} onChange={(e) => setCurrPass(e.target.value)} />
      <br />
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>{resp}</label>

      <br />
      <button onClick={handleRegestration}>Register</button>
      <button onClick={handleShowRegister}>Login</button>
    </div>
  );
}

export default Register;