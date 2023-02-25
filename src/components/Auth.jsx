import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import '../styles/login.css';

function Auth() {
    const [showRegister, setShowRegister] = useState(false);
    
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');


    return (
        <div className='auth'>
            {showRegister == false ? <Login setShowRegister={setShowRegister}  login = {login} password = {password}/> : null}
            {showRegister ? <Register setShowRegister={setShowRegister} setLogin={setLogin} setPassword={setPassword} /> : null}
        </div>
    );
}

export default Auth;
