import React, { useState, lazy, Suspense } from 'react';
import {  Route, Routes } from 'react-router-dom';
import { Navigate } from "react-router";

const MainPage = lazy(() => import('./components/MainPage'));
const Auth = lazy(() => import('./components/Auth'));


function App() {
  const [jwt_token, setJwtToken] = useState(localStorage.getItem('jwt_token'));

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
           <Routes>

              {jwt_token ?
              <Route path='/login' element={<Navigate to="/main"/>}/>:
              <Route path='/login' element={<Auth setJwtToken={setJwtToken}/>}/>}

              {jwt_token ? 
              <Route path='/main' element={<MainPage jwt_token={jwt_token} setJwtToken={setJwtToken}/>}/>:
              <Route path='/main' element={<Navigate to="/login"/>}/>}

              {jwt_token ? 
              <Route path='*' element={<Navigate to="/main"/>}/>:
              <Route path='*' element={<Navigate to="/login"/>}/>}

           </Routes>
      </Suspense>
    </div>
  );
}

export default App;
