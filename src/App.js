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
              
              {jwt_token ?
                <Routes>
                  <Route path='/main' element={<MainPage jwt_token={jwt_token} setJwtToken={setJwtToken}/>}/>
                  <Route path='*' element={<Navigate to="/main"/>}/>
                </Routes>:
                <Routes>
                  <Route path='/auth/*' element={<Auth setJwtToken={setJwtToken}/>}/>
                  <Route path='*' element={<Navigate to="/auth/login"/>}/>
                </Routes>
              }

      </Suspense>
    </div>
  );
}

export default App;
