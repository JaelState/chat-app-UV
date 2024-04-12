import React from 'react';
import Login from './components/login.js'; 
import SignUp from './components/SignUp.js';
import Chat from './components/Chat';
import './App.css';

const App = () => {
    return (
        <div>
            <div className="header">
                <h1 className="header-text">UV.CHAT</h1>
            </div>
            <Login />
            <SignUp />
            <Chat />
        </div>
    );
};

export default App;
