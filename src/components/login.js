import React, { useState } from 'react';
import firebase from '../firebase';
import '../App.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [userDisplayName, setUserDisplayName] = useState('');

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Login successful
                const user = userCredential.user;
                console.log('Logged in as:', user.email);

                // Update user status to online
                firebase.database().ref('users/' + user.uid + '/status').set('online');

                // Fetch user's display name from database
                firebase.database().ref('users/' + user.uid + '/displayName').once('value')
                    .then((snapshot) => {
                        const displayName = snapshot.val();
                        setUserStatus('online'); // Update user status in the UI
                        setUserDisplayName(displayName); // Set user's display name in the state
                    })
                    .catch((error) => {
                        console.error('Error fetching display name:', error.message);
                        setUserStatus('online'); // Update user status in the UI even if display name fetch fails
                    });
            })
            .catch((error) => {
                // Handle errors
                console.error('Login error:', error.message);
            });
    };

    const handleLogout = () => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            firebase.auth().signOut().then(() => {
                // Update user status to offline
                firebase.database().ref('users/' + currentUser.uid + '/status').set('offline');
                // Update user status in the UI
                setUserStatus('offline');
            }).catch((error) => {
                // Handle errors
                console.error('Logout error:', error.message);
            });
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-header">Login</h2>
            <h3>Status: {userStatus}</h3>
            <input
            className="login-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
            className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" onClick={handleLogin}>Login</button>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Login;
