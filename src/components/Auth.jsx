import React, { useState } from 'react';
import '../styles/login.css';
import Login from './Login';
import Register from './Register';

function Auth({ setJwtToken }) {
    const [showRegister, setShowRegister] = useState(false);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    function setAutoLogin(reg_login, reg_pass) {
        setShowRegister(false)
        setLogin(reg_login)
        setPassword(reg_pass)
    }

    return (
        <div className='auth'>
            {showRegister ?
                <Register setShowRegister={setShowRegister} setAutoLogin={setAutoLogin} /> :
                <Login setShowRegister={setShowRegister} reg_login={login} reg_password={password} setJwtToken={setJwtToken} />}
        </div>
    );
}

export default Auth;
