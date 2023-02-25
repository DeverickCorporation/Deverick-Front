import React, { useState } from 'react';
import "./styles/reset.css";

import Auth from "./components/Auth";
import MainPage from './components/MainPage';
function App() {

  const [jwt_token, setJwtToken] = useState(localStorage.getItem('jwt_token'));


  return (
    <div className="App">
      {jwt_token ? <MainPage jwt_token={jwt_token} setJwtToken={setJwtToken}/> : <Auth setJwtToken={setJwtToken} />}

    </div>
  );
}

export default App;
