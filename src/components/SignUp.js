import React, { useState } from 'react';
import firebase from '../firebase';
import '../App.css' 

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    const handleSignUp = () => {
        // Sign up logic
    };

    return (
        <div className="sign-up-container">
            <h2 className="sign-up-header">Sign Up</h2>
            <div className="sign-up-form">
                <label htmlFor="profilePicture">Profile Picture:</label>
                <input
                    id="profilePicture"
                    className="sign-up-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                />
                <input
                    className="sign-up-input"
                    type="text"
                    placeholder="Display Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <input
                    className="sign-up-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="sign-up-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="sign-up-button" onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
    );
};

export default SignUp;