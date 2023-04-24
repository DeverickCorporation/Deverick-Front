import React, { useState, Suspense } from 'react';
import '../styles/login.css';
import Login from './Login';
import Register from './Register';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from "react-router";
import { isMobile } from 'react-device-detect';

function Auth({ setJwtToken }) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    let className = "auth"
    if (isMobile) {
        className = "auth mob"
    }

    function setAutoLogin(reg_login, reg_pass) {
        setLogin(reg_login)
        setPassword(reg_pass)
    }

    return (
        <div className={className}>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='register' element={
                        <Register setAutoLogin={setAutoLogin} />} />

                    <Route path='login' element={
                        <Login reg_login={login} reg_password={password} setJwtToken={setJwtToken} />} />

                    <Route path='*' element={<Navigate to="/auth/login" />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default Auth;
