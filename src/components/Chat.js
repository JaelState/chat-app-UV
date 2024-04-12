import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import '../App.css'

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [userDisplayName, setUserDisplayName] = useState('');
    const [userProfilePicture, setUserProfilePicture] = useState('');

    useEffect(() => {
        const fetchMessages = () => {
            const messagesRef = firebase.database().ref('messages');
            messagesRef.on('value', (snapshot) => {
                const messageList = snapshot.val();
                const messages = [];
                for (let id in messageList) {
                    messages.push({ id, ...messageList[id] });
                }
                setMessages(messages);
            });
            return () => messagesRef.off('value');
        };

        const updateUserStatus = () => {
            const user = firebase.auth().currentUser;
            if (user) {
                const userStatusRef = firebase.database().ref('users/' + user.uid + '/status');
                userStatusRef.on('value', (snapshot) => {
                    const status = snapshot.val();
                    setUserStatus(status);
                });
                return () => userStatusRef.off('value');
            }
        };

        const fetchUserDisplayName = () => {
            const user = firebase.auth().currentUser;
            if (user) {
                const userDisplayNameRef = firebase.database().ref('users/' + user.uid + '/displayName');
                const userProfilePictureRef = firebase.database().ref('users/' + user.uid + '/profilePictureURL');

                userDisplayNameRef.on('value', (snapshot) => {
                    const displayName = snapshot.val();
                    setUserDisplayName(displayName || 'Anonymous');
                });

                userProfilePictureRef.on('value', (snapshot) => {
                    const profilePictureURL = snapshot.val();
                    setUserProfilePicture(profilePictureURL || ''); // Set user's profile picture URL or empty string if not available
                });

                return () => {
                    userDisplayNameRef.off('value');
                    userProfilePictureRef.off('value');
                };
            }
        };

        fetchMessages();
        updateUserStatus();
        fetchUserDisplayName();
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const user = firebase.auth().currentUser;
            if (user) {
                firebase.database().ref('users/' + user.uid).once('value')
                    .then((snapshot) => {
                        const displayName = snapshot.val().displayName;
                        const profilePictureURL = snapshot.val().profilePictureURL || ''; // Set user's profile picture URL or empty string if not available
                        firebase.database().ref('messages').push({
                            user: {
                                displayName: displayName,
                                profilePictureURL: profilePictureURL // Include user's profile picture URL in the message
                            },
                            text: newMessage
                        });
                        setNewMessage('');
                        console.log('Messages should be displayed now:', messages); // Add this log statement
                    })
                    .catch((error) => {
                        console.error('Error fetching user data:', error.message);
                    });
            }
        }
    };
    
    const clearMessages = () => {
        firebase.database().ref('messages').remove()
            .then(() => {
                console.log('Messages cleared successfully');
                setMessages([]);
            })
            .catch((error) => {
                console.error('Error clearing messages:', error.message);
            });
    }

    const isCurrentUserMessage = (message) => {
        const currentUser = firebase.auth().currentUser;
        return currentUser && message.user.uid === currentUser.uid;
    };
    

    return (
        <div className="chat-container">
            <h2 className="chat-header">Chat</h2>
            <div className="chat-messages">
            {messages.map(message => (
  <div key={message.id} className={`chat-message ${isCurrentUserMessage(message) ? 'current-user' : 'other-user'}`}>
    <img src={message.user.profilePictureURL} alt="Profile" className="message-profile-picture" />
    <div className="message-text">
      <div className="message-sender">{message.user.displayName}</div>
      <div>{message.text}</div>
      <div className="message-timestamp">{message.timestamp}</div>
    </div>
  </div>
))}

            </div>
            <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="chat-input"
            />
            <div className="chat-buttons">
                <button onClick={handleSendMessage} className="chat-button">Send</button>
                <button onClick={clearMessages} className="chat-button">Clear Messages</button>
            </div>
        </div>
    );
};

export default Chat;
