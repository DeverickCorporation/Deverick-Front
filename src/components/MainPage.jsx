import jwtDecode from 'jwt-decode';
import React from 'react';

import axios from 'axios';
import { API_URL } from '../config';


function MainPage({ jwt_token, setJwtToken }) {
  let user_data = jwtDecode(jwt_token)

  console.log(user_data)

  const handleLogout = () => {
    console.log("Loged out");
    localStorage.clear()
    setJwtToken(false)
  }

  const getPosts = () => {
    axios.get(API_URL + '/posts', {
      headers: {
        "jwt-token": jwt_token
      },
      params: { limit: 5 }
    }
    )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  getPosts()
  return (
    <div>
      <h1>Main Page</h1>
      <label>Token: {jwt_token}</label>
      <br />
      <br />

      <label>{JSON.stringify(user_data)}</label>
      <button onClick={handleLogout}>Logout</button>
      <label>{}</label>

    </div>
  );
}

export default MainPage;