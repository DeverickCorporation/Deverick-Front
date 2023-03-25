import React, { useState } from 'react';

import Auth from "./components/Auth";
import MainPage from './components/MainPage';

import {  Route, Routes, Router } from 'react-router-dom';
import { Navigate } from "react-router";

import { useNavigate } from 'react-router-dom'


function App() {

  const [jwt_token, setJwtToken] = useState(localStorage.getItem('jwt_token'));
  const navigate = useNavigate()


  return (
    <div className="App">
      
      {/* {jwt_token ? <MainPage jwt_token={jwt_token} setJwtToken={setJwtToken}/> : <Auth setJwtToken={setJwtToken} />} */}      

           <Routes>
                <Route
                  exact path='/login'
                   element={<Auth setJwtToken={setJwtToken}/>}
                />

              {jwt_token ? 
               <Route 
                path='/main'
                element={<MainPage jwt_token={jwt_token} setJwtToken={setJwtToken}/>}
                />:
                <Route path='/main' element={<Navigate to="/login"/>}/>}
               {/* if (jwt_token) {navigate('/main')} */}
           </Routes>

    </div>
  );
}

export default App;
