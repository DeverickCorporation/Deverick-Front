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

              {/* <Route path='/auth/*' element={<Auth setJwtToken={setJwtToken}/>}/> */}


              {jwt_token ?
              <Route path='/auth/*' element={<Navigate to="/main"/>}/>:
              <Route path='/auth/*' element={<Auth setJwtToken={setJwtToken}/>}/>
              }

              {jwt_token ? 
              <Route path='/main' element={<MainPage jwt_token={jwt_token} setJwtToken={setJwtToken}/>}/>:
              <Route path='/main' element={<Navigate to="/auth/login"/>}/>}

              {jwt_token ? 
              <Route path='*' element={<Navigate to="/main"/>}/>:
              <Route path='*' element={<Navigate to="/auth/login"/>}/>}

           </Routes>
      </Suspense>
    </div>
  );
}

export default App;
