import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import '../styles/login.css';

function Auth() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleShowLogin = () => {
        setShowLogin(true);
        setShowRegister(false);
    }

    const handleShowRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    }

    return (
        <div className='auth'>
            <div>
                {showLogin == false ? <button onClick={handleShowLogin}>Login</button> : null}
                {showRegister == false ? <button onClick={handleShowRegister}>Register</button> : null}
            </div>
            {showLogin ? <Login /> : null}
            {showRegister ? <Register /> : null}
        </div>
    );
}

export default Auth;
